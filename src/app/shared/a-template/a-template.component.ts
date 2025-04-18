import { Component, Inject, input, OnInit, Optional } from '@angular/core';
import { MerchantComponentConfig } from '../../core/models/merchant-config.model';
import { A_TEMPLATE_SCHEMA } from './customization.config';

@Component({
  selector: 'app-horizontal-img-info-tiles',
  standalone: true,
  imports: [],
  templateUrl: './a-template.component.html',
  styleUrl: './a-template.component.scss'
})
export class ATemplateComponent implements OnInit {
  data?: A_TEMPLATE_SCHEMA;
  constructor(
    @Optional() @Inject('componentConfig') private componentConfig: MerchantComponentConfig,
  ) {}

  ngOnInit(): void {
    this.data = this.componentConfig.data;
  }
}
