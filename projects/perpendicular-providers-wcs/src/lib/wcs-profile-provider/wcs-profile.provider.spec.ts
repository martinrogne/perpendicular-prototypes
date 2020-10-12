import { WCSProfileProvider } from './wcs-profile.provider';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import {
  WCSAddressFactory,
  WCSAddressFactoryModule,
  WCSIdentityFactory,
  WCSIdentityFactoryModule, WCSProfileFactory,
  WCSProfileFactoryModule
} from 'perpendicular-factories-wcs';
import {
  IAddressFactory,
  IIdentityFactory, IProfileFactory,
  MARKETING_CONSENT_COOKIE_PREFIX,
  PERPENDICULAR_HTTP,
  PRIVACY_POLICY_COOKIE_PREFIX,
  ProvidersWCSConfig
} from 'perpendicular-core';
import { HttpClient } from '@angular/common/http';
import { MockIdentityServiceModule, MockCookieServiceModule } from 'perpendicular-services-mock';
import { WCSAddress } from 'perpendicular-models-wcs';

fdescribe('WCSProfileProvider', () => {
  let spectator: SpectatorHttp<WCSProfileProvider>;
  const createService = createHttpFactory({
    service: WCSProfileProvider,
    imports: [
      MockIdentityServiceModule,
      MockCookieServiceModule,
      WCSIdentityFactoryModule
    ],
    mocks: [
      WCSProfileFactory,
      WCSAddressFactory
    ],
    providers: [
      ProvidersWCSConfig,
      { provide: PERPENDICULAR_HTTP, useExisting: HttpClient },
      { provide: MARKETING_CONSENT_COOKIE_PREFIX, useValue: '' },
      { provide: PRIVACY_POLICY_COOKIE_PREFIX, useValue: '' },
      { provide: IProfileFactory, useExisting: WCSProfileFactory },
      { provide: IAddressFactory, useExisting: WCSAddressFactory }
    ]
  });

  beforeEach(() => {
    spectator = createService();

    // FIXME: Get this from the service instead. Also, mock the factories in a module for re-use...
  });

  it('should create an instance', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('get profile', () => {
    it('should call backend to get the current profile', () => {
      const profile = spectator.service.getSelf();

      spectator.expectOne('/wcs/resources/store/0/person/@self', HttpMethod.GET);
    });

    it('should forward the response to the factory', () => {
      const profile = spectator.service.getSelf();

      const http = spectator.expectOne('/wcs/resources/store/0/person/@self', HttpMethod.GET);

      http.flush({ foo: 'bar'});

      expect(spectator.service.profileFactory.newInstanceFromJSON).toHaveBeenCalledTimes(1);
      expect(spectator.service.profileFactory.newInstanceFromJSON).toHaveBeenCalledWith(jasmine.objectContaining({ foo: 'bar'} ));
    });
  });

  describe('update profile', () => {

  });

  describe('add address', () => {
    it('should call backend', () => {
      const address = new WCSAddress();

      address.nickName = 'NickName-001';
      address.isBillingAddress = true;
      address.isShippingAddress = true;

      spectator.service.addAddressToAddressBook(address);

      const http = spectator.expectOne('/wcs/resources/store/0/person/@self/contact', HttpMethod.POST);
    });
  });

  describe('update address', () => {
    it('should call backend', () => {
      const address = new WCSAddress();

      address.nickName = 'NickName-001';
      address.isBillingAddress = true;
      address.isShippingAddress = true;

      spectator.service.updateAddressInAddressBook(address);

      const http = spectator.expectOne('/wcs/resources/store/0/person/@self/contact/NickName-001', HttpMethod.PUT);
    });
  });

  describe('delete address', () => {
    it('should call backend', () => {
      const address = new WCSAddress();

      address.nickName = 'NickName-001';
      address.isBillingAddress = true;
      address.isShippingAddress = true;

      spectator.service.deleteAddressFromAddressBook(address);

      const http = spectator.expectOne('/wcs/resources/store/0/person/@self/contact/NickName-001', HttpMethod.DELETE);
    });
  });

  describe('get profile by id', () => {

  });

  describe('change marketing consent', () => {

  });

  describe('update privacy policy', () => {

  });
});
