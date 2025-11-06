import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-popup-message',
  imports: [MatInputModule, FormsModule, CommonModule],
  templateUrl: './popup-message.html',
  styleUrl: './popup-message.css',
})
export class PopupMessage {

      durationInSeconds = 5;
      added: Boolean = false;
      deleted: Boolean = false;
      

      constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
