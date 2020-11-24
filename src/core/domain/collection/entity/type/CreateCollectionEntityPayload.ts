export type CreateCollectionEntityPayload = {
  userId: string;
  name: string;
  description?: string;
  isCustom?: boolean;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removedAt?: Date;
};
