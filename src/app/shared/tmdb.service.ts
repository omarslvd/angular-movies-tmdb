import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_KEY } from '../config/apikey';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

const API = {
  SEARCH: 'https://api.themoviedb.org/3/search/movie?api_key=<api_key>&language=en-US&query=<query>&page=<page>&include_adult=false'
}

@Injectable()
export class TmdbService {
  private page: number = 1;
  private apiKey: string = API_KEY;

  constructor(private http: Http) { }

  search(searchTerm): Promise<any> {
    return this.http.get(API.SEARCH.replace('<api_key>', `${this.apiKey}`).replace('<query>', `${searchTerm}`).replace('<page>', `${this.page}`))
      .toPromise()
      .then(data => data.json().results)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
