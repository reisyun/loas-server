export type CreateCollectionItemEntityPayload = {
  collectionId: string;
  id?: string;
  like?: boolean;
  private?: boolean;
  repeat?: number;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
