type WhereUniqueInput = {
  id: string;
};

export type RepositoryFindManyOptions = {
  cursor?: WhereUniqueInput;
  take?: number;
  skip?: number;
};
