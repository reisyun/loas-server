export type WhereUniqueInput<TIdentifier> = {
  id: TIdentifier;
};

/**
 * cursor id type definition needed
 */
export type RepositoryFindManyOptions<TIdentifier> = {
  cursor?: WhereUniqueInput<TIdentifier>;
  take?: number;
  skip?: number;
};
