export type IdToken = {
  iat: number;
  exp: number;
  sub: number;
  email: string;
  artistId?: number;
};
