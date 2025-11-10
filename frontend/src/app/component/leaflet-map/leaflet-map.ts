import { Component, AfterViewInit, inject, ViewContainerRef, inputBinding, signal, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';


import { RestaurantService } from '../../service/restaurant/restaurant.service';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PopupMapContent } from './popup-map-content/popup-map-content';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.html',
  styleUrls: ['./leaflet-map.css']
})
export class LeafletMapComponent implements AfterViewInit, OnInit{
  private map!: L.Map;
  //private markers: L.Marker[] = [];
  private markers = L.markerClusterGroup();


  private viewContainer = inject(ViewContainerRef);


  // Observable for restaurant data
  restaurants$: Observable<Restaurant[]> | undefined;

  constructor(private restaurantService: RestaurantService) {}
  ngOnInit(): void { 

    this.restaurants$ = this.restaurantService.getRestaurants("100", "100").pipe(
        tap({
          next: restaurants => {
           
            if (restaurants && restaurants.length > 0) {
              this.addRestaurantsToMap(restaurants);
          }
          },
          error: err => {
              console.error(err);
          },
          complete: () => {}
      })
    );
  }

  ngAfterViewInit() {
    this.initMap();
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

    restaurants.forEach(r => {
      const marker = L.marker([Number(r.latitude), Number(r.longitude)]);
      marker.bindPopup(this.createPopUpContent(r.nomoffre, r.type)).openPopup();
      this.markers.addLayer(marker);
    })


    this.map.addLayer(this.markers);

    this.centerMap();
  }

  private centerMap() {
    // if (!this.markers.length) return;

    // const bounds = L.latLngBounds(this.markers.map(m => m.getLatLng()));
    // this.map.fitBounds(bounds, { padding: [50, 50] });
  }
}
