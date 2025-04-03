import { Routes } from '@angular/router';
import { MerchantBaseLayoutComponent } from './merchant-base-layout/merchant-base-layout.component';
import { merchantConfigResolver } from './core/merchant-config.resolver';
import { PageTemplateComponent } from './page-template/page-template.component';

export const routes: Routes = [
  {
    path: ':merchantId',
    component: MerchantBaseLayoutComponent,
    resolve: {
      merchantConfig: merchantConfigResolver,
    },
    runGuardsAndResolvers: 'always', // Ensure resolver runs when `page` changes
    children: [
      {
        path: ':page',
        runGuardsAndResolvers: 'always',
        component: PageTemplateComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
