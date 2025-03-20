export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface MerchantConfig {
  merchantId: string;
  metaTags: MetaTag[];
  // Add other merchant-specific configurations as needed
}
