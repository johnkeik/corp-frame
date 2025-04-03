import { Component, ComponentFactoryResolver, inject, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MerchantConfigService } from '../core/services/merchant-config.service';
import {MerchantComponentConfig, MerchantComponentType, MerchantRouteConfig} from '../core/models/merchant-config.model';
import { HeroStandardComponent } from '../shared/hero-standard/hero-standard.component';
import { HeroSpecialComponent } from '../shared/hero-special/hero-special.component';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.scss'
})
export class PageTemplateComponent implements OnInit {
  merchantConfig = inject(MerchantConfigService).merchantConfig;
  pageConfig: MerchantRouteConfig | undefined;
  
  private componentMap: { [key in MerchantComponentType]?: Type<any> } = {
    [MerchantComponentType.HeroStandard]: HeroStandardComponent, 
    [MerchantComponentType.HeroSpecial]: HeroSpecialComponent 
  };

  @ViewChild('pageTemplateContainerRef', { read: ViewContainerRef }) containerRef?: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
  ) { 

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const page = params.get('page');
      console.log('herhehrheeh')
      this.pageConfig = this.merchantConfig()?.routes.find((route) => route.path === page);
      if(!this.pageConfig){
        console.log('Page not found');
      }
      this.titleService.setTitle(this.pageConfig?.title ?? 'Page not found');
    })

  }

  getComponentForConfig(componentConfig: MerchantComponentConfig): Type<any> {
    console.log(componentConfig.selector);
    return HeroSpecialComponent;
    // return this.componentMap[componentConfig.selector]!; 

  }
}
