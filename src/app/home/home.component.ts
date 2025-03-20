import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { TestComponentComponent } from '../test-component/test-component.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TestComponentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private platformId = inject(PLATFORM_ID);
  isServer = isPlatformServer(this.platformId);
  isBrowser = isPlatformBrowser(this.platformId);
}
