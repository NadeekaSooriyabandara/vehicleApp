import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule, MatCardModule, MatRadioModule,
  MatFormFieldModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatCardModule, MatRadioModule,
    MatFormFieldModule, MatSelectModule],
  exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatCardModule, MatRadioModule,
    MatFormFieldModule, MatSelectModule]
})
export class MaterialModule { }
