import { Component, inject } from '@angular/core';
import { MerchantConfigService } from '../services/merchant-config.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  merchantConfig = inject(MerchantConfigService).merchantConfig;
}
