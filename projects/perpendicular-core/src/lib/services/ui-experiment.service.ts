import { Injectable } from '@angular/core';
import { UIExperimentResult } from '../models/ui-experiment.model';
import { Observable } from 'rxjs';

/**
 * This service allows frontend to register a number of experiments to evaluate a customer for.
 * When the identity changes, the experiments are re-evaluated.
 *
 * You can then query the service to see what value a customer has in a particular experiment, for instance in a router-guard, and
 * use this to try out different implementations of UI, different logic flows, or otherwise.
 *
 * Usage:
 *
 * ```
 *    constructor(uiExperimentService: UIExperimentService) {
 *        this.uiExperimentService.state.subscribe( x => {
 *           this.buttonColor = uiExperiment.values.get("CHECKOUT_BUTTON_ALTERNATE_COLOR") || "blue";
 *        });
 *    }
 * ```
 *
 * Initialization
 * ```
 *     providers: [
 *        ...
 *        { provide: UIExperimentConfig, useValue: {
 *            experiments: [
 *                 "CHECKOUT_BUTTON_ALTERNATE_COLOR",
 *                 "ADD_DIRECT_TO_CART_WHEN_GOOGLE_IS_REFERRER",
 *                 ...
 *             ],
 *             reevaluateOnIdentityChange: true
 *        }}
 *     ]
 * ```
 *
 * If no experiments or experiment configuration are registered, no work is done.
 *
 *
 * Initially at least, we do not support experiments that are not session length at least.
 * This to avoid overhead of constantly re-evaluating the trigger, and also
 * to avoid having a weird UI experience for the customer.
 *
 * NOTE: This is not to be confused with A/B testing within a marketing spot. This service is to allow the UI flows and design elements to
 * be tested pr user.
 *
 * Also known as Feature Flags
 */

@Injectable()
export abstract class IUIExperimentService<UIExperimentResultType extends UIExperimentResult = UIExperimentResult> {
  /**
   * Subscribe to this to get information about the current users  newletter
   * profile information.
   */
  public get state(): Observable<UIExperimentResultType> {
    throw new Error('Not Implemented');
  }
}
