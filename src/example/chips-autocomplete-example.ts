import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable, from } from 'rxjs';
import { debounce, debounceTime, map, startWith, switchMap, tap, toArray } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FrutasService } from './service/frutas.service';
import { Fruta } from './model/fruta';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'chips-autocomplete-example',
  templateUrl: 'chips-autocomplete-example.html',
  styleUrls: ['chips-autocomplete-example.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class ChipsAutocompleteExample {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  selectedFruits: string[] = ['Lemon'];
  allFruits: string[];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);


  constructor(private frutasService: FrutasService) {

    const filteredFruits$ = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      debounceTime(400),
      switchMap((substring: string | null) => this.frutasService.loadAllFrutas(substring))
    )
      .subscribe(console.log);

    // filteredFruits$.subscribe(data=> this.filteredFruits =[] data);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedFruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.selectedFruits.indexOf(fruit);

    if (index >= 0) {
      this.selectedFruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedFruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}


/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */