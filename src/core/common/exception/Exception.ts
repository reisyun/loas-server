import { CodeDescription } from '@core/common/exception/Code';
import { Optional } from '@core/common/Types';

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  data?: TData;
  overrideMessage?: string;
};

/**
 * 예외 처리를 위한 클래스
 */
export class Exception<TData> extends Error {
  public readonly code: number;

  public readonly data: Optional<TData>;

  private constructor(codeDescription: CodeDescription, data?: TData, overrideMessage?: string) {
    super();

    this.name = this.constructor.name;
    this.code = codeDescription.code;
    this.data = data;
    this.message = overrideMessage || codeDescription.message;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<SData>(payload: CreateExceptionPayload<SData>): Exception<SData> {
    return new Exception(payload.code, payload.data, payload.overrideMessage);
  }
}
