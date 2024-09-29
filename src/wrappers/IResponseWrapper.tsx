

export interface IResponseWrapper<T> {
    response: Response,
    data: T,
    error: Error | undefined,
    element: JSX.Element | undefined
}