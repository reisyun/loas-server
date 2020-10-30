import { IsString } from 'class-validator';
import { Code } from '@core/common/exception/Code';
import { Exception } from '@core/common/exception/Exception';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { ClassValidationDetails } from '@core/common/util/ClassValidator';

class MockAdapter extends UseCaseAdapter {
  @IsString()
  public stringProperty: string;

  constructor(stringProperty: string) {
    super();
    this.stringProperty = stringProperty;
  }
}

describe('UseCaseAdapter', () => {
  describe('validate', () => {
    test("When MockAdapter is valid, expect it doesn't throw Exception", async () => {
      const validInstance: MockAdapter = new MockAdapter('42');
      await expect(validInstance.validate()).resolves.toBeUndefined();
    });

    test('When MockAdapter is not valid, expect it throws Exception', async () => {
      const stringProperty: unknown = 42;
      const invalidInstance: MockAdapter = new MockAdapter(stringProperty as string);

      expect.hasAssertions();

      try {
        await invalidInstance.validate();
      } catch (e) {
        const exception: Exception<ClassValidationDetails> = e;

        expect(exception).toBeInstanceOf(Exception);
        expect(exception.code).toBe(Code.USE_CASE_PORT_VALIDATION_ERROR.code);
        expect(exception.data?.errors[0].property).toBe('stringProperty');
      }
    });
  });
});
