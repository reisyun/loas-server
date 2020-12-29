import { Collection, CollectionItem } from '@prisma/client';

export interface PrismaCollection extends Collection {
  collector: { id: string; name: string };
  collectionItems: Array<CollectionItem>;
}
