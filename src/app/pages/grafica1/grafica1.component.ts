import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  public labels1: Label[] = ['Pan', 'Refresco', 'Tacos'];
  public data1: MultiDataSet = [[10, 20, 100]];
}
