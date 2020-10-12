import { WCSProfileFactory } from './wcs-profile.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { IAddressFactory, ProvidersWCSConfig } from 'perpendicular-core';
import { WCSAddressFactory } from '../wcs-address-factory/wcs-address.factory';

import guest from './data/guest-person-response.json';

describe('WCSProfileFactory', () => {
  let spectator: SpectatorService<WCSProfileFactory>;
  const createService = createServiceFactory({
    service: WCSProfileFactory,
    mocks: [
      ProvidersWCSConfig,
      WCSAddressFactory
    ],
    providers: [
      { provide: IAddressFactory, useExisting: WCSAddressFactory }
    ]
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('guest user', () => {
    it('should be able to deserialize a basic profile', () => {
      const profile = spectator.service.newInstanceFromJSON(guest);

      expect(profile.userId).toBe('738021');
    });
  });
});
