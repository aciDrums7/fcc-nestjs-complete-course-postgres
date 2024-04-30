import { ArtistsJwtAuthGuard } from './artists-jwt-auth.guard';

describe('ArtistsJwtGuard', () => {
  it('should be defined', () => {
    expect(new ArtistsJwtAuthGuard()).toBeDefined();
  });
});
