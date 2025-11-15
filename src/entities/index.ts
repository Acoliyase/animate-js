/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: communityanimations
 * Interface for CommunityAnimations
 */
export interface CommunityAnimations {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  animationName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  previewImage?: string;
  /** @wixFieldType text */
  codeSnippet?: string;
  /** @wixFieldType text */
  tags?: string;
  /** @wixFieldType text */
  authorName?: string;
  /** @wixFieldType url */
  liveDemoUrl?: string;
}


/**
 * Collection ID: documentation
 * Interface for Documentation
 */
export interface Documentation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType number */
  order?: number;
  /** @wixFieldType datetime */
  lastUpdated?: Date | string;
}
