type UserCreatedEventPayload = {
  id: string;
  name: string;
};

export class UserCreatedEvent {
  public readonly id: string;

  public readonly name: string;

  private constructor(payload: UserCreatedEventPayload) {
    this.id = payload.id;
    this.name = payload.name;
  }

  public static new(payload: UserCreatedEventPayload): UserCreatedEvent {
    return new UserCreatedEvent(payload);
  }
}
