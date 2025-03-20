import { MerchantConfig } from '../interfaces/merchant-config.interface';

export class MerchantConfigService {
  // This could be replaced with a database or API call
  private async fetchConfigFromDatabase(merchantId: string): Promise<MerchantConfig> {
    // Simulate database fetch
    const mockConfigs: { [key: string]: MerchantConfig } = {
      'merchant1': {
        merchantId: 'merchant1',
        metaTags: [
          { name: 'description', content: 'Merchant 1 description' },
          { property: 'og:title', content: 'Merchant 1' }
        ]
      },
      'merchant2': {
        merchantId: 'merchant2',
        metaTags: [
          { name: 'description', content: 'Merchant 2 description' },
          { property: 'og:title', content: 'Merchant 2' }
        ]
      },
      'default': {
        merchantId: 'default',
        metaTags: [
          { name: 'description', content: 'Default description' },
          { property: 'og:title', content: 'Default Site' }
        ]
      }
    };

    return mockConfigs[merchantId] || mockConfigs['default'];
  }

  async getConfig(merchantId: string): Promise<MerchantConfig> {
    return this.fetchConfigFromDatabase(merchantId);
  }
}
