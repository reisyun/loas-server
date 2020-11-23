export type CreateCollectionEntityPayload = {
  userId: string;
  name: string;
  description?: string;
  private?: boolean;
  isCustom?: boolean;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
