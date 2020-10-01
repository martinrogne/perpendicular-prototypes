import { BaseModel } from './base.model';
import { Organization } from './organization.model';
import { Role } from './role.model';

/**
 * This class represents a security context for a user. It contains information about his state (*isLoggedIn*),
 * and who the system sees him as (*userId*), in addition to the tokens issued by the backend server to collaborate
 * that fact.
 *
 *  NOTE: This does not contain any Profile information, such as name and address or choice of langauge. That information can be looked up
 * using the [[IProfileService]]
 */
export class Identity extends BaseModel {
  /**
   * Indicates if the user is in "preview mode". This is only available to *Site Administrator* and the like,
   * and allows him to view the sites unpublished content.
   */
  public inPreviewMode = false;

  /**
   * Indicatees whether or not the current session is established
   */
  public isEstablished = false;

  /**
   * Indicates whether or not the current session is a *Guest* or *Registered Customer* session.
   */
  public isLoggedIn = false;

  /**
   * The UserID as issued by the backing service.
   */
  public userId?: string;

  /**
   * The primary token used to verify that the session is established.
   */
  public wcToken?: string;

  /**
   * Secondary token used to verify that the session is happening over SSL
   */
  public wcTrustedToken?: string;

  /**
   * A random ID assigned to all anonymous users. Anonymous users are session that are neither *Guest* or *Registered Customer* sessions.
   * Used by the marketing engine to track anynomous users click behavior.
   */
  public personalizationId?: string;

  /**
   * List or roles the user has. Shoppers will typically only have *Registered Customer*, but Customer Service or
   * Site Administrator will have * addition roles
   */
  public roles: Role[] = [];

  /**
   * Token issued by backing service, to allow access to preview material.
   */
  public previewToken?: string;

  /**
   * List of organizations, he can trade for. Note these are sparsly populated.
   */
  public allowedOrganizations: Organization[] = [];

  /**
   * Currently Active organization
   */
  public activeOrganizationId?: string;

  /**
   * The list of contracts he can trade under
   */
  public allowedContracts: string[] = [];

  /**
   * Currently Active contract
   */
  public activeContractId?: string;

  /**
   * The session id for this session
   */
  public sessionId?: string;
}
