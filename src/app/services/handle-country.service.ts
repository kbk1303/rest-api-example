import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class HandleCountryService {
   url: string = "http://localhost:3000";
   endpointAllCountries: string = "countries";
   endpointEnrollCountry: string = "enroll/country";
   private _dirty = true;

   get dirty() { return this._dirty};
   set dirty(value) {this._dirty = value; }
  
  constructor(private httpClient: HttpClient) { }

  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.url+'/'+this.endpointAllCountries); 
  }

  addCountry(country: Country): Observable<Country> {
    return this.httpClient.post<Country>(this.url+'/'+this.endpointEnrollCountry, country);
  }
}
