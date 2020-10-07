import { WCSAddressFactory } from './wcs-address.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('WCSAddressFactory', () => {
  let spectator: SpectatorService<WCSAddressFactory>;
  const createService = createServiceFactory({
    service: WCSAddressFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });
});
