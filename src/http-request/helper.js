export function objectToFormData(obj, rootName, ignoreList) {
    let formData = new FormData();

    function appendFormData(data, root) {
        if (!ignore(root)) {
            root = root || "";
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    appendFormData(data[i], root + "[" + i + "]");
                }
            } else if (typeof data === "object" && data) {
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (root === "") {
                            appendFormData(data[key], key);
                        } else {
                            appendFormData(data[key], root + "[" + key + "]");
                        }
                    }
                }
            } else {
                if (data !== null && typeof data !== "undefined") {
                    formData.append(root, data);
                }
            }
        }
    }

    function ignore(root) {
        return (
            Array.isArray(ignoreList) &&
            ignoreList.some(function (x) {
                return x === root;
            })
        );
    }

    appendFormData(obj, rootName);

    return  formData;
      
}

export function responseExtractor(response={},key){
    let { data: { status = '', [key]: data = [] , message } = {} }  = response;
    if(status && String(status).toLowerCase() === 'success'){
        return { status: true , data }
    }else if(status && String(status).toLowerCase() === 'failed'){
        return { status:false, error: message }
    }else{
        return { status:false, error:extractError(response , "Unable to connect to server") };
    }

}

export function extractError(err , defaultMessage){
    if (
        err &&
        ((err.response && err.response.data.error.message) ||
            err.message)
    ) {
            return err.response ? err.response.data.error.message : err.message
    }else if(err && err.error && err.error.message){
        return err.error.message;
    } 
    else if(err && err.data && (err.data.error || err.data.message)){
        return err.data.error || err.data.message;
    }
    else {
        return err || defaultMessage ;
    }
}