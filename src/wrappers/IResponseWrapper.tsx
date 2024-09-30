/**
 * Interface for the response wrapper
 */
export interface IResponseWrapper<T> {
    response: Response,
    data: T,
    error: Error | undefined,
    element: JSX.Element | undefined
    alert: JSX.Element | undefined
}

export const defaultResponseWrapper: IResponseWrapper<any> = {
    response: new Response(''),
    data: undefined,
    error: undefined,
    element: undefined,
    alert: undefined
}