import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../core/header/header.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MerchantConfigService } from '../core/services/merchant-config.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-merchant-base-layout',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './merchant-base-layout.component.html',
  styleUrl: './merchant-base-layout.component.scss'
})
export class MerchantBaseLayoutComponent implements OnInit {
  merchantConfig = inject(MerchantConfigService).merchantConfig;
  metaService = inject(Meta);
  ngOnInit() {
    this.merchantConfig()?.metaTags?.forEach((tag) => {
      this.metaService.addTag(tag);
    });
  }
}
