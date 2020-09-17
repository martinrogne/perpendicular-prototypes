import { UIExperimentResult, UIExperimentConfig } from '../models/ui-experiment.model';

/**
 * An abstract factory to create instances of [[UIExperiment]]
 */
export abstract class IUIExperimentFactory {
  /**
   * Creates a new [[UIExperimentResult]]
   */
  public abstract newResultInstance(): UIExperimentResult;

  /**
   * Creates a new [[UIExperimentConfig]]
   */
  public abstract newConfigInstance(): UIExperimentConfig;
}
