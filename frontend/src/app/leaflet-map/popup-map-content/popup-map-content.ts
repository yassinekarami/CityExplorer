import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-map-content',
  imports: [],
  templateUrl: './popup-map-content.html',
  styleUrl: './popup-map-content.css',
})
export class PopupMapContent {
    @Input() nomoffre: string = '';
    @Input() type: string = '';

}
