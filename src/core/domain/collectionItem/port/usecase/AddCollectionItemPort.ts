export interface AddCollectionItemPort {
  collectionId: string;
  private?: boolean;
  completedAt?: Date;
  like?: boolean;
  repeat?: number;
}
