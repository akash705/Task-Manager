const axios = require("axios");
const path = require("./path.json");
const allURL = require("./url.json");

class httpRequest {
    constructor({ url = "", httpHeaders = {} }) {
        let { prefix, url: baseURL } = allURL[url];
        prefix = path[prefix];
        this.url = prefix + baseURL;
        this.httpHeaders = httpHeaders;
    }

    post(url, data, headers,options) {
        url = this.__getURL(url);
        return this.__postData(url, data, headers, options);
    }

    get(url, options) {
        url = this.__getURL(url);
        return this.__getData(url, options);
    }

    __getURL(url) {
        if (url) {
            return this.url + url;
        } else {
            return this.url;
        }
    }

    __postData(url, data, headers={},options = {}) {
        return axios.post(
            url,
            data,
            {
                headers: {
                    ...this.httpHeaders,
                    ...headers
                },
            },
            { ...options }
        );
    }

    __getData(url, options = {}) {
        return axios.get(url, {
            headers: this.httpHeaders,
            ...options,
        });
    }
}

module.exports = httpRequest;
