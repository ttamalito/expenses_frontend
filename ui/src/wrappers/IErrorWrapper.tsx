import React from 'react';
import InternalError from '../fallback/InternalError';

export interface IErrorWrapper {
  element: JSX.Element;
  error: boolean;
}

export const defaultErrorWrapper: IErrorWrapper = {
  element: <InternalError url={''} error={new Error('Unknown Error')} />,
  error: false,
};
