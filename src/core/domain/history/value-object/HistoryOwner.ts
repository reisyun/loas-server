import { IsString, IsUUID } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';

export class HistoryOwner extends ValueObject {
  @IsUUID()
  private readonly ownerId: string;

  @IsString()
  private readonly name: string;

  constructor(ownerId: string, name: string) {
    super();

    this.ownerId = ownerId;
    this.name = name;
  }

  public static async new(ownerId: string, name: string): Promise<HistoryOwner> {
    const user = new HistoryOwner(ownerId, name);
    await user.validate();

    return user;
  }

  public get getId(): string {
    return this.ownerId;
  }

  public get getName(): string {
    return this.name;
  }
}
