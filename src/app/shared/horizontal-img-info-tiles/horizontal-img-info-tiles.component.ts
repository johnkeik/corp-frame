import { Component, Inject, input, OnInit, Optional } from '@angular/core';
import { MerchantComponentConfig } from '../../core/models/merchant-config.model';

@Component({
  selector: 'app-horizontal-img-info-tiles',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-img-info-tiles.component.html',
  styleUrl: './horizontal-img-info-tiles.component.scss'
})
export class HorizontalImgInfoTilesComponent {
  constructor(
    @Optional() @Inject('componentConfig') private componentConfig: MerchantComponentConfig,
  ) {}

}
