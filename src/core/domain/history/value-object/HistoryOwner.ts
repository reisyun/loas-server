import { IsString, IsUUID } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';

export class HistoryOwner extends ValueObject {
  @IsUUID()
  private readonly userId: string;

  @IsString()
  private readonly name: string;

  constructor(userId: string, name: string) {
    super();

    this.userId = userId;
    this.name = name;
  }

  public static async new(userId: string, name: string): Promise<HistoryOwner> {
    const user = new HistoryOwner(userId, name);
    await user.validate();

    return user;
  }

  public get getId(): string {
    return this.userId;
  }

  public get getName(): string {
    return this.name;
  }
}
