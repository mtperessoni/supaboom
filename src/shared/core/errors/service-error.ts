export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly code?: string | number,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'ServiceError';

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServiceError);
    }
  }

  public toJSON() {
    return {
      message: this.message,
      code: this.code,
      cause: this.cause,
    };
  }
}
