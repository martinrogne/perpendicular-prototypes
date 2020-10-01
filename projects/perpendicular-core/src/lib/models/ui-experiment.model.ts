import { Injectable } from '@angular/core';

/**
 * Configuration class for UIExperiments
 */
@Injectable()
export class UIExperimentConfig {
  /**
   * The experiments to run
   */
  public experiments: string[] = [];

  /**
   * Whether to re-evaluate on identity change or not
   */
  public reevaluateOnIdentityChange = false;
}

/**
 * Result class for UI experiments
 *
 * Contains a map of all the experiements and their associated results.
 */
export class UIExperimentResult {
  /**
   * Map of EXPERIMENT_NAME => VALUE
   */
  protected values: Map<string, string> = new Map<string, string>();

  /**
   * Get value for an experiment
   */
  public get(key: string): string {
    return this.values.get(key) || '';
  }

  public set(key: string, value: string): void {
    this.values.set(key, value);
  }
}
