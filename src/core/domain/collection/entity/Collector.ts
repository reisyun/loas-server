import { IsString } from 'class-validator';
import { Entity } from '@core/common/Entity';

export class Collector extends Entity<string> {
  @IsString()
  private readonly name: string;

  constructor(id: string, name: string) {
    super();

    this.id = id;
    this.name = name;
  }

  public get getName(): string {
    return this.name;
  }

  public static async new(id: string, name: string): Promise<Collector> {
    const collector: Collector = new Collector(id, name);
    await collector.validate();

    return collector;
  }
}
