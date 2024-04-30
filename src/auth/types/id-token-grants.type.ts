/**
 * Represents the grants assigned to a user's ID token.
 */
export type IdTokenGrants = {
  email: string;
  sub: number;
  artistId?: number;
};
