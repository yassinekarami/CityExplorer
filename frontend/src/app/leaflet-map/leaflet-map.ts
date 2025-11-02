import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { RestaurantService } from '../service/restaurant.service';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.html',
  styleUrls: ['./leaflet-map.css']
})
export class LeafletMapComponent implements AfterViewInit {
  private map!: L.Map;
  private markers: L.Marker[] = [];

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

  private addRestaurantsToMap(restaurants: Restaurant[]) {
    if (!restaurants.length) return;

    // Clear previous markers if any
    this.markers.forEach(m => this.map.removeLayer(m));
    this.markers = [];

    restaurants.forEach(r => {
      const marker = L.marker([Number(r.latitude), Number(r.longitude)]);
      marker.addTo(this.map);
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
