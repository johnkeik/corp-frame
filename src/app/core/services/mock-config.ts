import { MerchantComponentType } from "../../shared/components-list";
import { MerchantConfig } from "../models/merchant-config.model";

export const  mockConfigs: { [key: string]: MerchantConfig } = {
    merchant1: {
      merchantId: 'merchant1',
      name: 'Merchant 1 label',
      routes: [
        {
          path: 'home',
          displayName: 'Home',
          title: 'Home title',
          components:[
            {
              selector: MerchantComponentType.HeroStandard,
            },
            {
              selector: MerchantComponentType.HeroSpecial,
            },
            {
              selector: MerchantComponentType.ImageCarousel,
            }
          ]
        },
        {
          path: 'about',
          displayName: 'About',
          title: 'About Title',
          components:[
            {
              selector: MerchantComponentType.HorizontalImgInfoTiles,
              data: {
                title: 'Delicious Pizza',
                description: "Our pizzas are made daily with fresh dough and sauce. They are topped  with 100% whole milk mozzarella cheese and other top-quality, fresh  ingredients. We are widely known for our Porto-Fino Special and House Special."
              }
            },
            {
              selector: MerchantComponentType.HorizontalImgInfoTiles,
            }
          ]
        },
      ],
      metaTags: [{ name: 'description', content: 'Merchant 1 description' }],
    },
    merchant2: {
      merchantId: 'merchant2',
      name: 'Merchant 2 label',
      routes: [
        {
          path: 'home',
          displayName: 'Home',
          title: 'Home 2 title',
        },
        {
          path: 'about',
          displayName: 'About',
          title: 'About 2 Title',
        },
      ],
      metaTags: [{ name: 'description', content: 'Merchant 2 description' }],
    },
    default: {
      merchantId: 'default',
      name: 'Default',
      routes: [
        {
          path: 'home',
          displayName: 'Home',
          title: 'Home default ',
        },
      ],
    },
  };