import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { TmdbService } from '../shared/tmdb.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [TmdbService]
})
export class SearchComponent implements OnInit {
  private searchTerms = new Subject<string>();
  searchResults: Observable<any>;
  resultSelected: any = null;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.searchResults = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(searchTerm => searchTerm ? this.tmdbService.search(searchTerm) : Observable.of<any[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      });
  }

  search(searchTerm) {
    if (!searchTerm) {
      this.resultSelected = null;
    }

    this.searchTerms.next(searchTerm);
  }

  onResultSelected(result: any) {
    this.resultSelected = result;
  }
}
