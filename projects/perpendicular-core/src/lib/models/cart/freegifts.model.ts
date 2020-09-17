import { BaseModel } from '../base.model';

/**
 * Represents a gift-selection option.
 */
export class GiftItem extends BaseModel {
    /**
     * The SKU id that you can select from
     */
    public productId?: string;

    /**
     * The quantity of that item, the gift is for
     */
    public quantity = 0;

    /**
     * Identifies the original option set that this gift was chosen from.
     */
    public optionId?: string;
}

/**
 * The set of options the customer has to choose from.
 * If the customer has multiple free-gift promotions, there will be one
 * GiftOption pr promotion triggered.
 */
export class GiftOption extends BaseModel {
    /**
     * A description of the gift to choose
     */
    public description = '';

    /**
     * The number of gifts from the ```items``` set, the customer can choose still.
     * I.e. 'pick 2 of these 5 items'.
     * Will show the number of choices the customer has "left", so if the original reward was for pick 2, and
     * the customer already picked 1, this will return 1
     */
    public numberOfGiftsToChoose = 0;

    /**
     * Identifies option set.
     */
    public optionId?: string;

    /**
     * The set of gifts the customer can choose from
     */
    public options: GiftItem[] = [];

    /**
     * The choices made by the customer, for this gift selection.
     */
    public choices: GiftItem[] = [];

    /**
     * the code used to identity the promotion. Can be used to look up promotion long description details etc
     * with the ```PromotionRegistry```
     */
    public code?: string;
}
