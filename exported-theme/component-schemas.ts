// Auto-generated component schemas
// Generated on 2025-04-18T08:13:33.298Z
// DO NOT EDIT MANUALLY

export interface A_TEMPLATE_SCHEMA {
    title: string;
    description: string;
    imageUrl: string;
    backgroundColor: string;
    textColor: string;
}

export interface HORIZONTAL_IMG_INFO_TILES_SCHEMA {
  title: string;
  description: string;
  imageUrl: string;
}

export interface HORIZONTAL_IMG_INFO_TILES_SCHEMA {
  title: string;
  description: string;
  imageUrl: string;
}

export interface HORIZONTAL_IMG_INFO_TILES_SCHEMA {
    title: string;
    description: string;
    imageUrl: string;
}

/**
 * Global interface mapping component names to their schema types
 * Use this for type-safe component configuration
 */
export interface ComponentSchemas {
  'a-template': A_TEMPLATE_SCHEMA;
  'hero-special': HORIZONTAL_IMG_INFO_TILES_SCHEMA;
  'hero-standard': HORIZONTAL_IMG_INFO_TILES_SCHEMA;
  'horizontal-img-info-tiles': HORIZONTAL_IMG_INFO_TILES_SCHEMA;
}

/**
 * Component configuration with typed data property
 */
export interface TypedComponentConfig<T extends keyof ComponentSchemas> {
  selector: T;
  data: ComponentSchemas[T];
}
