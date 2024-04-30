import { ApiKeyAuthGuard } from './api-key-auth.guard';

describe('ApiKeyAuthGuard', () => {
  it('should be defined', () => {
    expect(new ApiKeyAuthGuard()).toBeDefined();
  });
});
