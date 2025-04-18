import { Component, Inject, input, OnInit, Optional } from '@angular/core';
import { MerchantComponentConfig } from '../../core/models/merchant-config.model';
import { HORIZONTAL_IMG_INFO_TILES_SCHEMA } from './customization.config';

@Component({
  selector: 'app-horizontal-img-info-tiles',
  standalone: true,
  imports: [],
  templateUrl: './horizontal-img-info-tiles.component.html',
  styleUrl: './horizontal-img-info-tiles.component.scss'
})
export class HorizontalImgInfoTilesComponent implements OnInit {
  data?: HORIZONTAL_IMG_INFO_TILES_SCHEMA;
  constructor(
    @Optional() @Inject('componentConfig') private componentConfig: MerchantComponentConfig,
  ) {}

  ngOnInit(): void {
    this.data = this.componentConfig.data;
  }
}
