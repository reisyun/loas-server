/* eslint-disable @typescript-eslint/no-namespace */

/**
 * Prisma를 의존 한 이유.
 *
 * Prisma 자체에서 데이터베이스를 교체할 수 있어 API 구조는 동일.
 * "schema.prisma" 파일을 수정 후 generate 하는 거라 변경으로부터 문제가 생길 경우는 적음.
 * GET에 관한 요청은 Prisma API를 활용하는게 이 서비스에서 유리하다 판단.
 */
import { Prisma } from '@prisma/client';

export namespace UserRepositoryArgs {
  export type FindOne = Prisma.FindUniqueUserArgs;
  export type FindMany = Prisma.FindManyUserArgs;
}

export namespace CollectionRepositoryArgs {
  export type FindOne = Prisma.FindUniqueCollectionArgs;
  export type FindMany = Prisma.FindManyCollectionArgs;
}
