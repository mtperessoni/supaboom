export type CoreResult<T = null> = [T, Error | null];
export type ResponseResult<T = null> = Promise<CoreResult<T | null>>;

export const success = <T>(data: T): ResponseResult<T> => {
  return Promise.resolve([data, null]);
};

export const err = (error: Error | null): ResponseResult => {
  return Promise.resolve([null, error]);
};
