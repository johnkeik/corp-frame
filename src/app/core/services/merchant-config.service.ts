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
import { mockConfigs } from './mock-config';

const MERCHANT_CONFIG_KEY = makeStateKey<MerchantConfig>('merchantConfig');

@Injectable({ providedIn: 'root' })
export class MerchantConfigService {
  private _merchantConfig = signal<MerchantConfig | undefined>(undefined);
  public merchantConfig = computed(() => this._merchantConfig());

  fetchConfigFromDatabase(merchantId: string): Observable<MerchantConfig> {
    // Simulate database fetch
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
