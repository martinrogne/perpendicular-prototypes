import { WCSIdentityFactory } from './wcs-identity.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('WCSIdentityFactory', () => {
  let spectator: SpectatorService<WCSIdentityFactory>;
  const createService = createServiceFactory({
    service: WCSIdentityFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });
});

