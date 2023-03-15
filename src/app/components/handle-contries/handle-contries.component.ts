import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Country } from 'src/app/interfaces/country';
import { HandleCountryService } from 'src/app/services/handle-country.service';
import {MatSnackBar} from '@angular/material/snack-bar';

/**FormGroup factory */
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-handle-contries',
  templateUrl: './handle-contries.component.html',
  styleUrls: ['./handle-contries.component.css']
})
export class HandleContriesComponent implements OnInit {
  private countriesSubject$: Subject<Country[]> = new BehaviorSubject<Country[]>([]);
  countries$: Observable<Country[]> | undefined;

  /** add country */

  newCountryFromGrp: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^([A-ZÆØÅ]){1}([a-zøæå]{1,})$'),
    ]),
    flag: new FormControl('', [
      Validators.required,
      Validators.pattern('^([a-zøæå0-9]{1})([a-zøæåA-ZÆØÅ0-9\/_]){1,}\.svg$'),
    ]),
    area: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^([0-9]{1,})\.?([0-9]{2})$'),
    ]),
    population: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^([1-9]{1})([0-9]{1,})$'),
    ]),
    wikiUrl: new FormControl('', [
      Validators.required,
      Validators.pattern('^(https?:\/\/){1}([a-zA-Z_\.\/%0-9]){1,256}$'),
    ])
  });

  constructor(private apiService: HandleCountryService, private snackBar: MatSnackBar) {}

  fetchAllCountries(): void {
    this.apiService.getAllCountries().subscribe((countries: Country[]) => {
      next: {
        if(this.apiService.dirty) {
          this.countriesSubject$.next(countries);
          this.countries$ = this.countriesSubject$.asObservable();
          this.apiService.dirty = false;
          //console.log(countries)
          if(this.countries$) {
            this.countries$.subscribe((countries: Country[]) => {
              next: {console.log(countries);}
            });
          }
        }
      }
      complete: {() => console.log('observable closed for new values');}
      error: { (err: any) => console.error(err);}

    });
  }

  ngOnInit(): void {
    this.fetchAllCountries(); 
  }

  /** Form validation */
  private regValid(): boolean | undefined {
    return  this.newCountryFromGrp.get('name')?.valid &&
            this.newCountryFromGrp.get('flag')?.valid &&
            this.newCountryFromGrp.get('area')?.valid &&
            this.newCountryFromGrp.get('population')?.valid &&
            this.newCountryFromGrp.get('wikiUrl')?.valid;
  }

  //error handling from the form
  getErrorMessageName(): string | void {
    if(this.newCountryFromGrp.get('name')?.hasError('required')) {
      return 'Name must be entered';
    }
    else if (this.newCountryFromGrp.get('name')?.hasError('pattern')) {
      return 'Name must start with a Capital character, and only contain characters';
    }
  }

  getErrorMessageFlag(): string | void {
    if(this.newCountryFromGrp.get('flag')?.hasError('required')) {
      return 'flag´s wikipedia location must be entered';
    }
    else if (this.newCountryFromGrp.get('flag')?.hasError('pattern')) {
      return 'flag must start with a lower character or letter, and end with .svg';
    }
  }

  getErrorMessageArea(): string | void {
    if(this.newCountryFromGrp.get('area')?.hasError('required')) {
      return 'area (square kilometres) must be entered';
    }
    else if (this.newCountryFromGrp.get('area')?.hasError('pattern')) {
      return 'area must be entered as a decimal fraction with optional precision 2';
    }
  }

  getErrorMessagePopulation(): string | void {
    if(this.newCountryFromGrp.get('population')?.hasError('required')) {
      return 'population must be entered';
    }
    else if (this.newCountryFromGrp.get('population')?.hasError('pattern')) {
      return 'population must be entered as an integer value';
    }
  }

  getErrorMessageWikiUrl(): string | void {
    if(this.newCountryFromGrp.get('wikiUrl')?.hasError('required')) {
      return 'wikiUrl must be entered';
    }
    else if (this.newCountryFromGrp.get('wikiUrl')?.hasError('pattern')) {
      return 'wikiUrl must be entered as a fully qualified URL';
    }
  }


  onSubmit(): void {
    if(this.regValid()) {
      const country = {} as Country;
      country.name = this.newCountryFromGrp.get('name')?.value;
      country.flag = this.newCountryFromGrp.get('flag')?.value;
      country.area = this.newCountryFromGrp.get('area')?.value;
      country.population = this.newCountryFromGrp.get('population')?.value;
      country.wikiUrl = this.newCountryFromGrp.get('wikiUrl')?.value;
      this.apiService.addCountry(country).subscribe((resp) => {
        next: {
          console.log(resp);
          this.apiService.dirty = true;
          this.snackBar.open("Country created")._dismissAfter(5000);
          this.fetchAllCountries(); 
        }
      });
    }
  }

}
