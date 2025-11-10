import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoriteService } from '../../../service/favorite/favorite.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { PopupMessage } from '../../shared/popup-message/popup-message';
@Component({
  selector: 'app-popup-map-content',
  imports: [MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule],
  templateUrl: './popup-map-content.html',
  styleUrl: './popup-map-content.css',
})
export class PopupMapContent {

    private _snackBar = inject(MatSnackBar);

    private durationInSeconds = 5;

    @Input() nomoffre: string = '';
    @Input() type: string = '';


 

    constructor(private favoriteService: FavoriteService) {

    }



  openSnackBar(data: any) {
    this._snackBar.openFromComponent(PopupMessage, {
      duration: this.durationInSeconds * 1000,
      data: data
    });
  }

    /**
     * add a restaurant to the user's favorite resturant
     */
    addToFavorite(nomoffre: string) {
      console.log("selected Restaurant has been added to favorite")
      this.favoriteService.addFavorite(nomoffre).subscribe({
        next: () => {
          const data = {
            message: "Ajouter au favoris",
            added: true,
            deleted: false
          }
          this.openSnackBar(data)
        },
        error: (err: any) => console.error(err)
      });
    }

    /**
     * remove the restaurant from the user's favorite restaurant
     */
    removeFromFavorite(nomoffre: string) {
      console.log("selected Restaurant has been removed from the favorite list")
      this.favoriteService.removeFavorite(nomoffre).subscribe({
        next: () => {
          const data = {
            message: "Supprimé des favoris",
            added: false,
            deleted: true
          }
          this.openSnackBar(data)
        },
        error: (err: any) => console.error(err)
      });
    }

}
