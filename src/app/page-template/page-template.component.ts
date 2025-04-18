import { AfterViewInit, ChangeDetectorRef, Component, inject, Injector, NO_ERRORS_SCHEMA, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
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
export class PageTemplateComponent implements AfterViewInit {
  private injector = inject(Injector);
  private titleService = inject(Title);
  private route = inject(ActivatedRoute);
  merchantConfig = inject(MerchantConfigService).merchantConfig;
  pageConfig: MerchantRouteConfig | undefined;

  @ViewChild('componentsContainer', { read: ViewContainerRef, static: false }) 
  componentsContainer?: ViewContainerRef;

  ngAfterViewInit() {
    this.route.paramMap.subscribe((params) => {
      const page = params.get('page');
      this.pageConfig = this.merchantConfig()?.routes.find((route) => route.path === page);
      if(!this.pageConfig){
        console.log('Page not found');
      }
      if (this.pageConfig?.components && this.componentsContainer) {
        this.loadComponents();
      }
      this.titleService.setTitle(this.pageConfig?.title ?? 'Page not found');
    })

  }
  
  loadComponents() {
    if (!this.componentsContainer || !this.pageConfig?.components) return;
    
    this.componentsContainer.clear();
    
    this.pageConfig.components.forEach(component => {
      const componentType = this.getComponentForConfig(component);
      const injector = this.createInjectorForComponent(component);

      const componentRef = this.componentsContainer!.createComponent(componentType, { injector});
      
      // Pass configuration to component
      if (componentRef.instance.hasOwnProperty('config')) {
        componentRef.instance.config = component;
      }
      
      componentRef.changeDetectorRef.detectChanges();
    });
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
        { provide: 'componentConfig', useValue: component }
      ],
      parent: this.injector
    });
  }
}
