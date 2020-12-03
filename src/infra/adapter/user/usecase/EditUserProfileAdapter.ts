import { Exclude, Expose, plainToClass } from 'class-transformer';
import { IsUUID, IsString, IsEnum, IsOptional } from 'class-validator';
import { UseCaseAdapter } from '@core/common/UseCaseAdapter';
import { Gender, Language } from '@core/domain/user/entity/Profile';
import { EditUserProfilePort } from '@core/domain/user/port/usecase/EditUserProfilePort';

@Exclude()
export class EditUserProfileAdapter extends UseCaseAdapter implements EditUserProfilePort {
  @Expose()
  @IsUUID()
  public userId!: string;

  @Expose()
  @IsString()
  @IsOptional()
  public shortBio?: string;

  @Expose()
  @IsString()
  @IsOptional()
  public avatar?: string;

  @Expose()
  @IsEnum(Gender)
  @IsOptional()
  public gender?: Gender;

  @Expose()
  @IsEnum(Language)
  @IsOptional()
  public language?: Language;

  public static async new(payload: EditUserProfilePort): Promise<EditUserProfileAdapter> {
    const adapter: EditUserProfileAdapter = plainToClass(EditUserProfileAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
