import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { Optional } from '@core/common/Types';
import { ClassValidationDetails, ClassValidator } from '@core/common/util/ClassValidator';

/**
 * 엔티티에서 기본적으로 필요한 속성 및 메서드를 내장
 */
export class Entity<TIdentifier extends string | number> {
  protected id: Optional<TIdentifier>;

  public get getId(): TIdentifier {
    if (typeof this.id === 'undefined') {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        overrideMessage: `${this.constructor.name}: ID is empty.`,
      });
    }

    return this.id;
  }

  /**
   * 엔티티 규격에 맞는 데이터인지 확인
   */
  public async validate(): Promise<void> {
    const details: Optional<ClassValidationDetails> = await ClassValidator.validate(this);
    if (details) {
      throw Exception.new({
        code: Code.ENTITY_VALIDATION_ERROR,
        data: details,
      });
    }
  }
}
