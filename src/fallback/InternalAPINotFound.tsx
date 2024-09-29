import React from "react";

interface IInternalAPINotFound {
    url: string
}

export default function InternalAPINotFound({url}: IInternalAPINotFound) {
    return <div>
        <h1>Not Found</h1>
        <p>The page you are looking for does not exist</p>
        <p>{url}</p>
    </div>
}