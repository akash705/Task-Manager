import React from 'react';
import Preloader from "../../resources/svg/preloader.svg";

export default function PageWrapper({
    showLoader:loader=false,
    children
}) {
    if(loader){
        return (
            <div className={'position-absolute width-100 text-center'} style={{
                top: "50%",
                transform: "translate(00%,-50%)",
            }}>
                <img src={Preloader} style={{
                    height: "75px",
                }} />
            </div>
        )
    }
    return children;
}
