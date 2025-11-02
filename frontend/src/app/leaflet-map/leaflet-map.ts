import { Component, AfterViewInit, inject, ViewContainerRef, inputBinding, signal } from '@angular/core';
import * as L from 'leaflet';
import { RestaurantService } from '../service/restaurant.service';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupMapContent } from './popup-map-content/popup-map-content';

@Component({
  standalone: true,
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.html',
  styleUrls: ['./leaflet-map.css']
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];

  private viewContainer = inject(ViewContainerRef);


  // Observable for restaurant data
  restaurants$: Observable<Restaurant[]>;

  constructor(private restaurantService: RestaurantService) {
    // Expose restaurants as an observable
    this.restaurants$ = this.restaurantService.getRestaurants().pipe(
      tap(restaurants => this.addRestaurantsToMap(restaurants))
    );
  }

  ngAfterViewInit() {
    this.initMap();

    // Subscribe reactively to restaurants
    this.restaurants$.subscribe({
      error: err => console.error('Error fetching restaurants:', err)
    });
  }

  private initMap() {
    const baseMapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map').setView([47.2184, -1.5536], 13); // Default center
    L.tileLayer(baseMapURL).addTo(this.map);
  }


  /**
   * Create a html popup based on the PopupMapComponent
   * @param nomoffre name of the restautant displayed in the popup
   * @param type type of the restaurant dispayed in the pop
   * @returns and html native element
   */
  private createPopUpContent(nomoffre: String, type: String) {
    const componentRef =  this.viewContainer.createComponent(PopupMapContent, {
      bindings: [
        inputBinding('nomoffre', signal(nomoffre)),
        inputBinding('type', signal(type)),
        
      ]
    });

    return componentRef.location.nativeElement;
  }


  private addRestaurantsToMap(restaurants: Restaurant[]) {
    if (!restaurants.length) return;

    // Clear previous markers if any
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    restaurants.forEach(r => {
      const marker = L.marker([Number(r.latitude), Number(r.longitude)]);
      marker.addTo(this.map).bindPopup(this.createPopUpContent(r.nomoffre, r.type)).openPopup();
      this.markers.push(marker);
    });

    this.centerMap();
  }

  private centerMap() {
    if (!this.markers.length) return;

    const bounds = L.latLngBounds(this.markers.map(m => m.getLatLng()));
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }
}
