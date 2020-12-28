export type CreateHistoryItemEntityPayload = {
  mediaId: string;
  id?: string;
  repeat?: number;
  private?: boolean;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
