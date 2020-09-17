import {
    Cart,
    Product,
    Order,
    OrderItem,
    CartItem,
    MarketingContent,
    MarketingImageContent,
    MarketingCategoryContent,
    Category,
} from 'perpendicular-core';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { Injectable } from '@angular/core';
import { Angulartics2 } from 'angulartics2';

declare var dataLayer: any;

/**
 * Provider-extension for the Google Tag Manager provider for Angulartics2. It currently provides a set
 * of default functionality for the following external tag manager configurations:
 *
 * - enhanced ecommerce tracking
 * - adform tracking
 */
@Injectable()
export class EnhancedAngulartics2GoogleTagManager extends Angulartics2GoogleTagManager {
    /**
     * Extended constructor, to provide access to Angulartics2
     */
    constructor(protected angularetics: Angulartics2) {
        super(angularetics);
    }

    /**
     * Extension for event tracking to add ecommerce data
     */
    public eventTrack(action: string, properties: any): void {
        properties = properties || {};

        if (typeof dataLayer !== 'undefined' && dataLayer) {
            const event: any = {
                event: properties.event || 'interaction',
                target: properties.category || 'Event',
                action,
                label: properties.label,
                value: properties.value,
                interactionType: properties.noninteraction,
                userId: this.angularetics.settings.gtm.userId,
            };

            if (event.action === 'ProductSummaryView') {
                this.addEnhancedEcommerceProductSummaryViewData(event);
            }

            if (event.action === 'ProductSummaryClick') {
                this.addEnhancedEcommerceProductSummaryClickData(event);
            }

            if (event.action === 'ProductDetailsView') {
                this.addAdformDetailsViewData(event);
                this.addEnhancedEcommerceProductDetailsViewData(event);
            }

            if (event.action === 'AddToCart') {
                this.addAdformCartData(event);
                this.addEnhancedEcommerceProductAddData(event);
            }

            if (event.action === 'RemoveFromCart') {
                this.addAdformCartData(event);
                this.addEnhancedEcommerceProductRemoveData(event);
            }

            if (event.action === 'CheckoutStep') {
                this.addEnhancedEcommerceCheckoutStepData(event);
            }

            if (event.action === 'PlaceOrder') {
                this.addAdformPurchaseData(event);
                this.addEnhancedEcommerceOrderPurchaseData(event);
            }

            if (event.action === 'PromoView') {
                this.addEnhancedEcommercePromoViewData(event);
            }

            if (event.action === 'PromoClick') {
                this.addEnhancedEcommercePromoClickData(event);
            }

            dataLayer.push(event);
        }
    }

    protected addAdformCartData(event: any): void {
        const cart: Cart = event.label.cart as Cart;

        const products = [];

        for (const item of cart.items) {
            const product: any = {
                productid: this.getCartItemIdentifier(item),
                categoryname: '',
                productname: item.name,
                step: 2,
            };

            products.push(product);
        }

        const adform: any = {
            order: {
                sales: cart.grandTotalAmount,
                orderid: cart.id,
                itms: products,
            },
        };

        event.adform = adform;
    }

    protected addAdformDetailsViewData(event: any): void {
        const product: Product = event.label as Product;
        const adform: any = {
            products: [
                {
                    productid: this.getProductIdentifier(product),
                    categoryname: '',
                    productname: product.name,
                    step: 1,
                },
            ],
        };

        event.adform = adform;
    }

    protected addAdformPurchaseData(event: any): void {
        const order: Order = event.label as Order;

        const products = [];

        for (const item of order.items) {
            const product: any = {
                productid: this.getOrderItemIdentifier(item),
                categoryname: '',
                productname: item.name,
                step: 3,
            };

            products.push(product);
        }

        const adform: any = {
            order: {
                sales: this.calculateOrderGrandTotal(order),
                orderid: order.id,
                itms: products,
            },
        };

        event.adform = adform;
    }
    /**
     * Map Marketing content data to promotions impression
     */
    protected addEnhancedEcommercePromoViewData(event: any): void {
        event.ecommerce = {
            promoView: {
                promotions: this.getPromotionsData(event),
            },
        };
    }
    /**
     * Map Marketing content data to promotions click event
     */
    protected addEnhancedEcommercePromoClickData(event: any): void {
        event.ecommerce = {
            promoClick: {
                promotions: this.getPromotionsData(event),
            },
        };
    }

    protected addEnhancedEcommerceProductSummaryViewData(event: any): void {
        const products: Array<Product> = event.label.products as Array<Product>;
        const positions: Map<string, number> = event.label.positions as Map<string, number>;
        const impressions = [];

        for (const product of products) {
            let p: Product = product;
            if (product.skus.length > 0) {
                p = product.skus[0];
            }

            let position = 0;
            if (positions.has(product.productId || '')) {
                position = positions.get(product.productId || '') as number;
            }

            impressions.push({
                name: p.name,
                id: this.getProductIdentifier(p),
                price: this.calculateProductPrice(p),
                brand: this.getProductBrand(p),
                category: this.getProductCategoryIdentifier(p),
                list: event.label.list,
                position,
            });
        }

        const ecommerce = {
            impressions,
        };

        event.ecommerce = ecommerce;
    }

    protected addEnhancedEcommerceProductSummaryClickData(event: any): void {
        const product: Product = event.label.product as Product;

        let p: Product = product;
        if (product.skus.length > 0) {
            p = product.skus[0];
        }

        const ecp = {
            name: p.name,
            id: this.getProductIdentifier(p),
            price: this.calculateProductPrice(p),
            brand: this.getProductBrand(p),
            category: this.getProductCategoryIdentifier(p),
            position: event.label.position,
        };

        const ecommerce = {
            click: {
                actionField: { list: event.label.list },
                products: [ecp],
            },
        };

        event.ecommerce = ecommerce;
    }

    protected addEnhancedEcommerceProductDetailsViewData(event: any): void {
        const product: Product = event.label as Product;

        let p: Product = product;
        if (product.skus.length > 0) {
            p = product.skus[0];
        }

        const ecp = {
            name: p.name,
            id: this.getProductIdentifier(p),
            price: this.calculateProductPrice(p),
            brand: this.getProductBrand(p),
            category: this.getProductCategoryIdentifier(p),
        };

        const ecommerce = {
            detail: {
                products: [ecp],
            },
        };

        event.ecommerce = ecommerce;
    }

    protected addEnhancedEcommerceProductAddData(event: any): void {
        const products: Product[] = event.label.products;

        const ecommerce = {
            add: {
                products: products.map((product, index) => {
                    return {
                        name: product.name,
                        id: this.getProductIdentifier(product),
                        price: this.calculateProductPrice(product),
                        brand: this.getProductBrand(product),
                        category: this.getProductCategoryIdentifier(product),
                        quantity: event.label.quantities[index],
                    };
                }),
            },
        };

        event.ecommerce = ecommerce;
    }

    protected addEnhancedEcommerceProductRemoveData(event: any): void {
        const product: Product = event.label.product as Product;
        const ecp = {
            name: product.name,
            id: this.getProductIdentifier(product),
            price: this.calculateProductPrice(product),
            brand: this.getProductBrand(product),
            category: this.getProductCategoryIdentifier(product),
            quantity: event.label.quantity,
        };

        const ecommerce = {
            remove: {
                products: [ecp],
            },
        };

        event.ecommerce = ecommerce;
    }

    protected addEnhancedEcommerceCheckoutStepData(event: any): void {
        const ecommerce = {
            checkout: {
                actionField: { step: event.label.step, option: event.label.option },
            },
        };

        event.ecommerce = ecommerce;
    }

    protected addEnhancedEcommerceOrderPurchaseData(event: any): void {
        const order: Order = event.label as Order;
        const ecp: any[] = [];

        for (const item of order.items) {
            ecp.push({
                name: item.name,
                id: this.getOrderItemIdentifier(item),
                price: this.calculateOrderItemPrice(item),
                quantity: item.quantity,
            });
        }

        const ecommerce = {
            purchase: {
                actionField: {
                    id: order.id,
                    revenue: this.calculateOrderGrandTotal(order),
                    tax: this.calculateOrderTax(order),
                    shipping: this.calculateOrderShipping(order),
                },
                products: ecp,
            },
        };

        event.ecommerce = ecommerce;
    }
    /**
     * Parse promotions array data from the event
     */
    protected getPromotionsData(event: any): any {
        const promos: Array<MarketingContent> = event.label.promos as Array<MarketingContent>;
        const positions: Map<string, number> = event.label.positions as Map<string, number>;
        const categories = event.label.categories as Array<Category>;
        return promos.map(item => {
            return {
                id: item.contentActivityId,
                name: this.getPromotionName(item, categories),
                creative: this.getPromotionCreative(item, categories),
                position: event.label.list + '_' + positions.get(item.contentActivityId || ''),
            };
        });
    }
    /**
     * Helper function to determine the name of the promotion
     * Name field should tell something about the promotion, EX: Free shipping on january
     * Marketing action target is ok'ish info here as it will tell where the user will be navigated on click
     */
    protected getPromotionName(content: MarketingContent, categories: Category[]): any {
        if (content instanceof MarketingCategoryContent) {
            const category = categories.find(cat => cat.id === content.categoryId);
            return category ? category.seotoken : 'NO_TARGET_' + content.categoryId;
        }
        return content.action && content.action.target ? content.action.target : 'NO_TARGET_' + content.contentActivityId;
    }

    /**
     * Helper function to determine the creative for the promotion
     * Creative field should tell wich version of the promotion is in use, for example if there are banners that have the same link
     * then this field can tell what content the promotion was showing.
     * Image name for image content, text for text content and category name for category content
     */
    protected getPromotionCreative(content: MarketingContent, categories: Category[]): any {
        let creative = '';

        if (content instanceof MarketingImageContent) {
            const imageName = content.url.split('/').reverse()[0];
            creative = imageName;
        } else if (content instanceof MarketingCategoryContent) {
            const category = categories.find(cat => cat.id === content.categoryId);
            creative = category ? category.name : 'NO_CATEGORY_NAME_' + content.categoryId;
        } else {
            // trim html elements and extra spaces away
            creative = content.text
                .replace(/<[^>]*>?/gm, '')
                .replace(/\s+/g, ' ')
                .trim();
        }
        return creative;
    }

    /**
     * Helper function to determine the brand to use from the product
     */
    protected getProductBrand(product: Product): string {
        return product.manufacturer;
    }
    /**
     * Helper function to determine the identifier to use from the orderitem
     */
    protected getOrderItemIdentifier(item: OrderItem): string {
        return item.productId || '';
    }

    /**
     * Helper function to determine the identifier to use from the cart item
     */
    protected getCartItemIdentifier(item: CartItem): string {
        return item.productId || '';
    }

    /**
     * Helper function to determine the identifier to use from the product
     */
    protected getProductIdentifier(product: Product): string {
        return product.productId || '';
    }

    /**
     * Helper function to determine the category
     */
    protected getProductCategoryIdentifier(product: Product): string {
        return product && product.parentCategoryIds && product.parentCategoryIds.length > 0 ? product.parentCategoryIds[0] : '';
    }

    /**
     * Helper function to calculate the actual price to be passed on for a product
     */
    protected calculateProductPrice(product: Product): number {
        return product.offerPrice;
    }

    /**
     * Helper function to calculate the actual grand total of the order
     */
    protected calculateOrderItemPrice(item: OrderItem): number {
        return item.orderItemPrice;
    }

    /**
     * Helper function to calculate the actual grand total of the order
     */
    protected calculateOrderGrandTotal(order: Order): number {
        return order.grandTotalAmount;
    }

    /**
     * Helper function to calculate the actual tax total of the order
     */
    protected calculateOrderTax(order: Order): number {
        return order.salesTaxTotalAmount;
    }

    /**
     * Helper function to calculate the actual shipping cost of the order
     */
    protected calculateOrderShipping(order: Order): number {
        return order.shippingTotalAmount;
    }
}