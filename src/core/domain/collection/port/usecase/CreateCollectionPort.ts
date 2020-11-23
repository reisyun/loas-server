export interface CreateCollectionPort {
  userId: string;
  name: string;
  description?: string;
  isCustom?: boolean;
}
