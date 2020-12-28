type UserDeletedEventPayload = {
  id: string;
};

export class UserDeletedEvent {
  public readonly id: string;

  private constructor(payload: UserDeletedEventPayload) {
    this.id = payload.id;
  }

  public static new(payload: UserDeletedEventPayload): UserDeletedEvent {
    return new UserDeletedEvent(payload);
  }
}
