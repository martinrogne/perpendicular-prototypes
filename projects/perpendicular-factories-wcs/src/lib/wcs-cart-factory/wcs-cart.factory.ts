import { WCSGiftItem, WCSGiftOption, WCSCartItemAttribute, WCSAdjustment, WCSCartItem, WCSCart } from 'perpendicular-models-wcs';
import { Injectable } from '@angular/core';

import { CartItemAttribute, ICartFactory, IShippingModeFactory,
  Cart,
  CartItem,
  Adjustment,
  AdjustmentUsageType,
  GiftOption,
  GiftItem,
  CartItemComponent,
  IAddressFactory,
  IPaymentInstructionFactory,
} from 'perpendicular-core';

/**
 * A factory to deserialize profile information about a carts from WebSphere Commerce.
 */
@Injectable()
export class WCSCartFactory extends ICartFactory {
  /**
   * Default constructor. Do not instantiate this class directly. Get it from the DI framework.
   */
  constructor(
    public shipModeFactory: IShippingModeFactory,
    public addressFactory: IAddressFactory,
    public paymentInstructionFactory: IPaymentInstructionFactory,
  ) {
    super();
  }

  /**
   * Instantiates a new cart
   */
  public newInstance(): Cart {
    const l: Cart = new WCSCart();
    l.shippingMode = this.shipModeFactory.newInstance();
    return l;
  }
  /**
   * Instantiates a new cart item
   */
  public newItemInstance(): CartItem {
    const l: CartItem = new WCSCartItem();
    return l;
  }

  /**
   * Instantiates a new Cart object, and deserializes the json coming from WebSphere Commerce.
   * The returned object is ReadOnly.
   */
  public newInstanceFromJSON(json: any): Cart {
    const l: Cart = this.composeCart(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  /**
   * Instantiates a new Cart Item object, and deserializes the json coming from WebSphere Commerce.
   * The returned object is ReadOnly.
   */
  public newItemInstanceFromJSON(json: any): CartItem {
    const l: CartItem = this.composeCartItem(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return l;
  }

  /**
   * Instantiates a new Adjustment class
   */
  public newAdjustmentInstance(): Adjustment {
    return new WCSAdjustment();
  }

  /**
   * Instantiates a new Adjustment class, and populates it with content from the backend.
   */
  public newAdjustmentInstanceFromJSON(json: any): Adjustment {
    const l: Adjustment = this.composeAdjustment(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  /**
   * Instantiates a new GiftOption class
   */
  public newGiftOptionInstance(): GiftOption {
    return new WCSGiftOption();
  }

  /**
   * Instantiates a new GiftOption class, and populates it with content from the backend.
   */
  public newGiftOptionInstanceFromJSON(json: any): GiftOption {
    const l: GiftOption = this.composeGiftOption(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  /**
   * Instantiates a new GiftItem class
   */
  public newGiftItemInstance(): GiftItem {
    return new WCSGiftItem();
  }

  /**
   * Instantiates a new CartItemAttribute class
   */
  public newCartItemAttributeInstance(): CartItemAttribute {
    return new WCSCartItemAttribute();
  }

  /**
   * Instantiates a new GiftItem class, and populates it with content from the backend.
   */
  public newGiftItemInstanceFromJSON(json: any): GiftItem {
    const l: GiftItem = this.composeGiftItem(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }
  /**
   * Returns a new mutable cart item component, initialzed with the passed values.
   */
  public newCartItemComponent(productId: string, quantity: number): CartItemComponent {
    const c = new CartItemComponent();
    c.productId = productId;
    c.quantity = quantity;
    return c;
  }

  /**
   * Returns a new immutable cart item component, initialzed with data from the backend.
   */
  public newCartItemComponentFromJson(json: any): CartItemComponent {
    const l: CartItemComponent = this.composeCartItemComponent(json);
    return Object.freeze(l);
  }
  /**
   * Deserializer from backend service
   */
  protected composeCart(json: any): Cart {
    const cart: Cart = this.newInstance();
    cart.userId = String(json.buyerId || '');
    cart.organizationId = String(json.orgUniqueID || '');
    cart.id = String(json.orderId);
    cart.grandTotalAmount = parseFloat(json.grandTotal);
    cart.shippingTotalAmount = parseFloat(json.totalShippingCharge);
    cart.adjustmentTotalAmount = parseFloat(json.totalAdjustment);
    cart.productTotalAmount = parseFloat(json.totalProductPrice);
    cart.shippingTaxTotalAmount = parseFloat(json.totalShippingTax);
    cart.salesTaxTotalAmount = parseFloat(json.totalSalesTax);
    cart.currency = json.totalProductPriceCurrency;
    if (json.promotionCode !== undefined) {
      for (const code of json.promotionCode) {
        cart.promotionCodes.push(code.code);
      }
    }

    if (json.lastUpdateDate) {
      cart.lastModified = new Date(json.lastUpdateDate);
    }

    if (!!json.adjustment && !(json.adjustment.length === 0)) {
      for (const adjustment of json.adjustment) {
        // we filter out the orderItem level adjustments, as they are represented on the items themselves also.
        if (adjustment.displayLevel === 'OrderItem') {
          continue;
        }
        cart.adjustments.push(this.newAdjustmentInstanceFromJSON(adjustment));
      }
    }

    if (!!json.rewardOption && !(json.rewardOption.length === 0)) {
      for (const rewardOption of json.rewardOption) {
        const giftOption = this.newGiftOptionInstanceFromJSON(rewardOption);
        cart.freeGiftOptions.push(giftOption);
      }
    }

    let firstItem = true;
    for (const idx in json.orderItem) {
      if (!json.orderItem.hasOwnProperty(idx)) {
        continue;
      }

      const child = json.orderItem[idx];
      const cartItem: CartItem = this.newItemInstanceFromJSON(child);

      // set shipping mode and address from the first order item
      if (firstItem) {
        cart.shippingMode = this.shipModeFactory.newInstanceFromJSON(child);
        if (!child.physicalStoreId) {
          cart.shippingAddressNickName = child.nickName;
        } else {
          cart.storeLocationId = String(child.physicalStoreId);
        }
        firstItem = false;
      }

      cart.items.push(cartItem);
    }

    if (json.orderExtendAttribute) {
      for (const orderAttribute of json.orderExtendAttribute) {
        cart.attributes.push(this.composeCartItemAttribute(orderAttribute));
      }
    }

    for (const paymentInstructionIdx in json.paymentInstruction) {
      if (!json.paymentInstruction.hasOwnProperty(paymentInstructionIdx)) {
        continue;
      }
      cart.paymentInstructions.push(this.paymentInstructionFactory.newInstanceFromJSON(json.paymentInstruction[paymentInstructionIdx]));

      cart.billingAddress = this.addressFactory.newInstanceFromJSON(json.paymentInstruction[paymentInstructionIdx]);
    }

    return cart;
  }

  /**
   * Deserializer from backend service
   */
  protected composeCartItem(json: any): CartItem {
    const cartItem: CartItem = this.newItemInstance();
    cartItem.productId = String(json.productId);
    cartItem.partNumber = json.partNumber;
    cartItem.name = json.partNumber; // todo, get observable that looks up product info
    cartItem.price = parseFloat(json.orderItemPrice);
    cartItem.unitprice = Number(json.unitPrice);
    cartItem.inventoryStatus = json.orderItemInventoryStatus;
    cartItem.currency = json.currency;
    cartItem.quantity = parseInt(json.quantity, 10);
    cartItem.lineId = String(json.orderItemId);
    cartItem.seoslug = '';
    cartItem.isFreeGift = json.freeGift === 'true';

    cartItem.definingAttributes = [];

    if (!!json.adjustment && !(json.adjustment.length === 0)) {
      for (const adjustment of json.adjustment) {
        if (adjustment.displayLevel === 'Order') {
          continue;
        }
        cartItem.adjustments.push(this.newAdjustmentInstanceFromJSON(adjustment));
      }
    }

    if (json.orderItemExtendAttribute) {
      for (const orderItemAttribute of json.orderItemExtendAttribute) {
        cartItem.attributes.push(this.composeCartItemAttribute(orderItemAttribute));
      }
    }

    if (json.orderItemComponent) {
      for (const oicomp of json.orderItemComponent) {
        const comp = this.newCartItemComponentFromJson(oicomp);
        cartItem.components.push(comp);
      }
    }

    const wcsItem = cartItem as WCSCartItem;
    wcsItem.unitOfMeasure = json.UOM || 'C62';

    return cartItem;
  }

  /**
   * Deserializer for cart item attributes from backend
   */
  protected composeCartItemAttribute(json: any): CartItemAttribute {
    const attr: CartItemAttribute = this.newCartItemAttributeInstance();

    attr.name = json.attributeName;
    attr.value = json.attributeValue;
    attr.type = json.attributeType;

    return attr;
  }

  /**
   * Deserializer from backend service
   */
  protected composeGiftOption(json: any): GiftOption {
    const giftOption: GiftOption = this.newGiftOptionInstance();

    giftOption.description = json.adjustmentDescription || '';
    giftOption.numberOfGiftsToChoose = Number(json.rewardSpecMaxQuantity);
    giftOption.optionId = String(json.rewardOptionId);
    giftOption.code = json.adjustmentCode;

    if (!!json.rewardChoiceGiftItem) {
      giftOption.numberOfGiftsToChoose -= json.rewardChoiceGiftItem.length;

      for (const rewardChoiceGiftItem of json.rewardChoiceGiftItem) {
        const item = rewardChoiceGiftItem;
        item.rewardOptionId = String(json.rewardOptionId);
        giftOption.choices.push(this.newGiftItemInstanceFromJSON(item));
      }
    }

    if (!!json.rewardSpecGiftItem) {
      for (const rwdIdx in json.rewardSpecGiftItem) {
        if (!json.rewardSpecGiftItem.hasOwnProperty(rwdIdx)) {
          continue;
        }

        const item = json.rewardSpecGiftItem[rwdIdx];

        // we push the rewardOptionId to the gift item, to avoid having to pass around the giftOption later on.
        item.rewardOptionId = json.rewardOptionId;
        giftOption.options.push(this.newGiftItemInstanceFromJSON(item));
      }
    }

    return giftOption;
  }

  /**
   * Deserializer from backend service
   */
  protected composeGiftItem(json: any): GiftItem {
    const giftItem: GiftItem = this.newGiftItemInstance();
    giftItem.productId = String(json.productId);
    giftItem.quantity = Number(json.value || json.quantity);
    giftItem.optionId = String(json.rewardOptionId);
    return giftItem;
  }

  /**
   * Deserialize promotion information
   */
  protected composeAdjustment(json: any): Adjustment {
    const adjustment = this.newAdjustmentInstance();
    adjustment.usage = this.composeAdjustmentUsage(json.usage);
    adjustment.amount = Number(json.amount);
    adjustment.currency = json.currency;
    adjustment.description = json.description;
    adjustment.code = json.code;

    return adjustment;
  }

  protected composeCartItemComponent(json: any): CartItemComponent {
    const component = this.newCartItemComponent('', 0);
    component.productId = '' + json.catalogEntryIdentifier.uniqueID;
    component.quantity = Number(json.quantity.value);
    if (json.unitPrice && json.unitPrice.price) {
      component.unitPrice = Number(json.unitPrice.price.value || 0);
      component.currency = json.unitPrice.price.currency;
      component.totalPrice = component.unitPrice * component.quantity;
    }
    return component;
  }

  /**
   * Converts/Parses the adjustment usage type into the AdjustmentUsageType enum.
   * @param usage the usage type of the adjustment
   */
  protected composeAdjustmentUsage(usage: string): AdjustmentUsageType {
    switch (usage) {
      case 'Surcharge Tax':
        return AdjustmentUsageType.SurchargeTax;
      case 'Installment Adjustment':
        return AdjustmentUsageType.InstallmentAdjustment;
      case 'Shipping Adjustment':
        return AdjustmentUsageType.ShippingAdjustment;
      case 'Surcharge':
        return AdjustmentUsageType.Surcharge;
      case 'Coupon':
        return AdjustmentUsageType.Coupon;
      case 'Shipping Tax':
        return AdjustmentUsageType.ShippingTax;
      case 'Sales Tax':
        return AdjustmentUsageType.SalesTax;
      case 'Shipping':
        return AdjustmentUsageType.Shipping;
      case 'Discount':
        return AdjustmentUsageType.Discount;
      default:
        return AdjustmentUsageType.Other;
    }
  }
}
