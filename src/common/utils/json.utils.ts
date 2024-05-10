export class JsonUtils {
  static prismaWhereToJson(where: object): string {
    return Object.entries(where)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
  }
}
