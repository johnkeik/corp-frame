import {
  Injectable,
  PLATFORM_ID,
  Inject,
  signal,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MerchantConfig } from '../models/merchant-config.model';
import { MerchantComponentType } from '../../shared/components-list';

const MERCHANT_CONFIG_KEY = makeStateKey<MerchantConfig>('merchantConfig');

@Injectable({ providedIn: 'root' })
export class MerchantConfigService {
  private _merchantConfig = signal<MerchantConfig | undefined>(undefined);
  public merchantConfig = computed(() => this._merchantConfig());

  fetchConfigFromDatabase(merchantId: string): Observable<MerchantConfig> {
    // Simulate database fetch
    const mockConfigs: { [key: string]: MerchantConfig } = {
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

    return of(mockConfigs[merchantId] || mockConfigs['default']);
  }

  fetchConfig(merchantId: string): Observable<MerchantConfig> {
    console.log('merchantId', merchantId);
    return this.fetchConfigFromDatabase(merchantId).pipe(
      tap((config) => {
        this._merchantConfig.set(config);
      })
    );
  }
}
