import { inject } from '@angular/core';
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MerchantConfigService } from './services/merchant-config.service';
import { MerchantConfig } from './models/merchant-config.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const merchantConfigResolver: ResolveFn<MerchantConfig | null> = (
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
) => {
    const merchantId = route.paramMap.get('merchantId');
    if (!merchantId) {
        return of(null);
    }
    
    return inject(MerchantConfigService).fetchConfig(merchantId).pipe(
        catchError(() => of(null))
    );
};
