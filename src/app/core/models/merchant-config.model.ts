import { MetaDefinition } from "@angular/platform-browser";
import { MerchantComponentType } from "../../shared/components-list";

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
    data?: any;
    children?: MerchantComponentConfig[];
}

