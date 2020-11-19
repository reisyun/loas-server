export interface EditLibraryPort {
  libraryId: string;
  userId: string;
  name?: string;
  description?: string;
  private?: boolean;
}
