import { BaseModel } from './base.model';

/**
 * Extra images for products. Each angle image will have both a full Image and a thumbnail. It is customary to ensure, that the
 * first (primary) image is also present in the angle image list, to give the customer some way of getting back to the primary image.
 */
export class AngleImage extends BaseModel {
    /**
     * Fully Qualified URL of the Full sized image.
     */
    public fullImage = '';

    /**
     * Fully qualified URL of the thumbnail image.
     */
    public thumbnailImage = '';
}
