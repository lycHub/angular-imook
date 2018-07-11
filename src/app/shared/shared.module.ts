import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule,
  MatToolbarModule, MatGridListModule, MatDialogModule, MatAutocompleteModule, MatMenuModule, MatCheckboxModule,
  MatTooltipModule, MatDatepickerModule, MatRadioModule, MatNativeDateModule, MatSelectModule, MatSidenavModule,
  MatButtonToggleModule, MatFormFieldModule, MatChipsModule
} from "@angular/material";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from "../directive/directive.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';
import { ChipsListComponent } from './chips-list/chips-list.component';
import { IdentityInputComponent } from './identity-input/identity-input.component';
import { AreaListComponent } from './area-list/area-list.component';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    FormsModule,
    ReactiveFormsModule,
    ImageListSelectComponent,
    AgeInputComponent,
    MatButtonToggleModule,
    MatFormFieldModule,
    ChipsListComponent,
    MatChipsModule,
    IdentityInputComponent,
    AreaListComponent
  ],
  declarations: [ConfirmDialogComponent, ImageListSelectComponent, AgeInputComponent, ChipsListComponent, IdentityInputComponent, AreaListComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
