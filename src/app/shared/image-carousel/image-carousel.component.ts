import { Component, ViewChild, ElementRef, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss'
})
export class ImageCarouselComponent {
  @ViewChild('carousel') carouselRef?: ElementRef;
  
  // Default images as fallback
  images = [
    '../../../assets/demo/image-carousel/image1.png',
    '../../../assets/demo/image-carousel/image2.png',
    '../../../assets/demo/image-carousel/image3.png',
    '../../../assets/demo/image-carousel/image4.png',
    '../../../assets/demo/image-carousel/image5.png',
  ];

  currentIndex = 0;
  title = 'Check our store';

  constructor(
    @Optional() @Inject('componentConfig') private componentConfig: any,
    @Optional() @Inject('data') private injectedData: any
  ) {
    // Set component properties from injected data if available
    if (this.injectedData) {
      if (this.injectedData.images) {
        this.images = this.injectedData.images;
      }
      if (this.injectedData.title) {
        this.title = this.injectedData.title;
      }
    }
    console.log('Received component config:', this.componentConfig);
    console.log('Received data:', this.injectedData);
  }

  scrolLeft() {
    this.currentIndex = this.currentIndex === 0 ? this.currentIndex = this.images.length - 1 : this.currentIndex - 1;
  }

  scrolRight() {
    this.currentIndex = this.currentIndex === this.images.length - 1 ? this.currentIndex = 0 : this.currentIndex + 1;
  }
}
