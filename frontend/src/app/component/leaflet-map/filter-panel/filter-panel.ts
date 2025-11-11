import {ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RestaurantService } from '../../../service/restaurant/restaurant.service';
import { tap } from 'rxjs';


@Component({
  standalone: true,
  selector: 'app-filter-panel',
  imports: [FormsModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './filter-panel.html',
  styleUrl: './filter-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanel implements OnInit{

  constructor(){}

  private readonly _formBuilder = inject(FormBuilder);

  @Output() filterChange = new EventEmitter<any>();

  readonly toppings = this._formBuilder.group({
    pizzeria: false,
    cuisineTraditionnelle: false,
    brasserie: false,
    restaurationRapide: false,
    bistrotBarAVin: false,
    restaurantGastronomiqueCuisineRaffinee: false,
    creperie: false,
    cuisineDuMonde: false,
    guinguette: false,
    grillRotisserie: false,
    salonDeThe: false,
    fruitDeMer: false,
    coffeeShop: false,
    cafeteria: false
  });

  ngOnInit(): void {
    this.toppings.valueChanges.subscribe(value => {
      this.filterChange.emit(value);
    })
  }
}

