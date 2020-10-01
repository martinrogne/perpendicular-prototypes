import { Attachment } from '../models/attachment.model';
import { IFactory } from '../factories/base.factory';
/**
 * An abstract factory to create instances of [[Attachment]]
 */
export abstract class IAttachmentFactory extends IFactory<Attachment> {}
