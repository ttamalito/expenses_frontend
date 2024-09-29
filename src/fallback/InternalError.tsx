import React from "react";

interface IInternalError {
    url: string,
    error: Error
}

export default function InternalError({url, error}: IInternalError) {
    return <div>
        <h1>Internal Error</h1>
        <p>There was an internal error while calling {url}</p>
        <p>{error.name}</p>
        <p>{error.message}</p>
        <p>{error.stack}</p>
    </div>
}