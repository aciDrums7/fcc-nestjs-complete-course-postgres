import { ArtistsJwtGuard } from './artists-jwt.guard';

describe('ArtistsJwtGuard', () => {
  it('should be defined', () => {
    expect(new ArtistsJwtGuard()).toBeDefined();
  });
});
