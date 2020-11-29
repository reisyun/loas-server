import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/Types';
import { ClassValidationDetails, ClassValidator } from '@core/common/util/ClassValidator';

export class ValueObject {
  /**
   * 값 객체 규격에 맞는 데이터인지 검증
   */
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.VALUE_OBJECT_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
