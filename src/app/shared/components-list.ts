import { Type } from '@angular/core';
import { HeroSpecialComponent } from './hero-special/hero-special.component';
import { HeroStandardComponent } from './hero-standard/hero-standard.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TrackYourOrderComponent } from './track-your-order/track-your-order.component';
import { HorizontalImgInfoTilesComponent } from './horizontal-img-info-tiles/horizontal-img-info-tiles.component';

export const ComponentsList = [
  HeroStandardComponent,
  HeroSpecialComponent,
  ImageCarouselComponent,
  TestimonialsComponent,
  TrackYourOrderComponent,
  HorizontalImgInfoTilesComponent
];

export const componentMap: { [key in MerchantComponentType]: Type<any> } = {
  'hero-standard': HeroStandardComponent,
  'hero-special': HeroSpecialComponent,
  'image-carousel': ImageCarouselComponent,
  'testimonials': TestimonialsComponent,
  'horizontal-img-info-tiles': HorizontalImgInfoTilesComponent,
};

export enum MerchantComponentType {
    HeroStandard = 'hero-standard',
    HeroSpecial = 'hero-special',
    ImageCarousel = 'image-carousel',
    Testimonials = 'testimonials',
    HorizontalImgInfoTiles = 'horizontal-img-info-tiles',
}
