import { Prisma } from '@prisma/client';

export class JsonUtils {
  static prismaWhereToJson(where: Prisma.SongWhereUniqueInput): string {
    return Object.entries(where)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }
}
