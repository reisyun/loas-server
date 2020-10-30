import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/Types';
import { ClassValidationDetails, ClassValidator } from '@core/common/util/ClassValidator';

export class UseCaseAdapter {
  /**
   * 어댑터 규격에 맞는 데이터인지 확인
   */
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.USE_CASE_PORT_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
