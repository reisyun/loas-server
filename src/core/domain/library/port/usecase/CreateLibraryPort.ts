export interface CreateLibraryPort {
  userId: string;
  name: string;
  description?: string;
  private?: boolean;
  isCustom?: boolean;
}
