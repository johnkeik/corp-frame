import { MetaDefinition } from "@angular/platform-browser";

export interface MerchantConfig {
    merchantId: string;
    name: string;
    metaTags?: MetaDefinition[];
    routes: MerchantRouteConfig[];
}

export interface MerchantRouteConfig {
    path: string;
    title: string;
    displayName: string;
    components?: MerchantComponentConfig[];
}

export interface MerchantComponentConfig {
    selector: MerchantComponentType;
    children?: MerchantComponentConfig[];
}


export enum MerchantComponentType {
    HeroStandard = 'hero-standard',
    HeroSpecial = 'hero-special',
}