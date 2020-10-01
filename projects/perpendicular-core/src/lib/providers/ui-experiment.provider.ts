import { UIExperimentResult } from '../models/ui-experiment.model';
import { UIExperimentConfig } from '../models/ui-experiment.model';

/**
 * Provider for UI Experiments
 */
export abstract class IUIExperimentProvider {
  /**
   * Fetches a set experiment results from the backend
   */
  public abstract getExperimentValues(config: UIExperimentConfig): Promise<UIExperimentResult>;
}
