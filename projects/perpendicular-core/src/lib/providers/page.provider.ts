import { Page } from '../models/page.model';

/**
 * Provider to look up a [[Page]] by its page name. The page name is the "external" identifier for the page,
 * like
 *
 * - CustomerServiceIntroPage
 * - FreeRefundsInformationPage
 *
 * You can get the pageName from a SEO url by using the [[ISEORegistry]]
 * etc
 */
export abstract class IPageProvider {
    /**
     * Fetches a Page object from the backend
     *
     * @param pageName the name of the page to locate
     */
    public abstract getPageByPageName(pageName: string): Promise<Page>;
}
