import { validate, ValidationError } from 'class-validator';
import { Optional } from '@core/common/Types';

export type ClassValidationErrors = {
  property: string;
  message: string[];
};

export type ClassValidationDetails = {
  context: string;
  errors: ClassValidationErrors[];
};

export class ClassValidator {
  /**
   * 받아온 값을 target의 포맷과 비교하여 올바른지 검증
   *
   * @param target 검증할 대상
   * @return 올바른 값이 아니라면 에러 객체 반환
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public static async validate<TTarget extends object>(
    target: TTarget,
  ): Promise<Optional<ClassValidationDetails>> {
    let details: Optional<ClassValidationDetails>;
    const errors: ValidationError[] = await validate(target);

    if (errors.length) {
      details = {
        context: target.constructor.name,
        errors: [],
      };

      errors.map(error =>
        details?.errors.push({
          property: error.property,
          message: error.constraints ? Object.values(error.constraints) : [],
        }),
      );

      return details;
    }

    return details;
  }
}
