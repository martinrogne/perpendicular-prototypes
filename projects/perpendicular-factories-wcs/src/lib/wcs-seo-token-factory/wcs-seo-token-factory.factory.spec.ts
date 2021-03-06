import { WCSSEOTokenFactory } from './wcs-seo-token-factory.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('WCSSEOTokenFactory', () => {
  let spectator: SpectatorService<WCSSEOTokenFactory>;
  const createService = createServiceFactory({
    service: WCSSEOTokenFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });
});

