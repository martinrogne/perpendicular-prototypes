import { WCSPaymentInstructionFactory } from './wcs-payment-instruction.factory';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

describe('WCSPaymentInstructionFactory', () => {
  let spectator: SpectatorService<WCSPaymentInstructionFactory>;
  const createService = createServiceFactory({
    service: WCSPaymentInstructionFactory,
  });

  beforeEach(() => spectator = createService());

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });
});
