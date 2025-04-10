import { Component, inject, Injector, NO_ERRORS_SCHEMA, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MerchantConfigService } from '../core/services/merchant-config.service';
import {MerchantComponentConfig, MerchantRouteConfig} from '../core/models/merchant-config.model';
import { HeroStandardComponent } from '../shared/hero-standard/hero-standard.component';
import { HeroSpecialComponent } from '../shared/hero-special/hero-special.component';
import { componentMap, ComponentsList } from '../shared/components-list';
import { CommonModule } from '@angular/common';
import { ImageCarouselComponent } from '../shared/image-carousel/image-carousel.component';
import { TestimonialsComponent } from '../shared/testimonials/testimonials.component';


@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [CommonModule, ComponentsList],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class PageTemplateComponent implements OnInit {
  merchantConfig = inject(MerchantConfigService).merchantConfig;
  pageConfig: MerchantRouteConfig | undefined;
  private injector = inject(Injector);
  

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
    const component = componentMap[componentConfig.selector];
    if (!component) {
      console.warn(`Component not found for selector: ${componentConfig.selector}`);
      return HeroStandardComponent; // fallback to standard component
    }
    return component;
  }

  // Create a custom injector for each component with its specific data
  createInjectorForComponent(component: MerchantComponentConfig): Injector {
    return Injector.create({
      providers: [
        { provide: 'componentConfig', useValue: component },
      ],
      parent: this.injector
    });
  }
}
