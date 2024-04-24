/**
 * Represents the grants assigned to a user's ID token.
 */
export interface IdTokenGrants {
  email: string;
  sub: number;
  artistId?: number;
}
