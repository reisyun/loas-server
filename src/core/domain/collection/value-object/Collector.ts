import { IsString, IsUUID } from 'class-validator';
import { ValueObject } from '@core/common/ValueObject';

export class Collector extends ValueObject {
  @IsUUID()
  private readonly userId: string;

  @IsString()
  private readonly name: string;

  constructor(userId: string, name: string) {
    super();

    this.userId = userId;
    this.name = name;
  }

  public static async new(userId: string, name: string): Promise<Collector> {
    const collector = new Collector(userId, name);
    await collector.validate();

    return collector;
  }

  public get getId(): string {
    return this.userId;
  }

  public get getName(): string {
    return this.name;
  }
}
