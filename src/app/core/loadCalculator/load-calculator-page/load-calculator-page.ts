import { Component, OnInit } from '@angular/core';
import { TruckTypes } from '../../../data/truck-types';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-calculator-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './load-calculator-page.html',
  styleUrls: ['./load-calculator-page.css'],
})
export class LoadCalculatorPage implements OnInit {
  truckTypes = new TruckTypes();

  selectedType: keyof TruckTypes = 'TIR';
  palletType: string = 'CC';
  count: any;

  ngOnInit() {
    this.updatePalletType();
  }

  updatePalletType() {
    const truck = this.truckTypes.getTruck(this.selectedType);
    this.palletType = Object.keys(truck.Pallets)[0] || '';
  }

  load() {
    this.truckTypes.load(this.selectedType, this.palletType, this.count);
  }

  unload() {
    this.truckTypes.unload(this.selectedType, this.palletType, this.count);
  }

  resetAll() {
    this.truckTypes.resetAll();
  }

  totalLoad() {
    return this.truckTypes.totalLoad(this.selectedType);
  }

  remainingAll() {
    return this.truckTypes.remainingAll(this.selectedType);
  }

  palletKeys() {
    return Object.keys(this.truckTypes.getTruck(this.selectedType).Pallets);
  }
}
