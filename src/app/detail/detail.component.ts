import { Component, OnInit, Input } from '@angular/core';

import { TmdbService } from '../shared/tmdb.service';
import { Movie } from '../shared/movie';
import { Crew } from '../shared/crew';
import { Cast } from '../shared/cast';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private _selected: any = null;

  @Input()
  set selected(selected: any) {
    this._selected = selected;

    if (selected) {
      this.getCredits(this._selected.id);
    }
  }
  get selected() {
    return this._selected;
  }
  movie: Movie = null;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
  }

  getCredits(movieId: number) {
    this.tmdbService.getCredits(movieId)
      .then(data => {
        this.movie = new Movie();

        this.movie.original_title = this.selected.original_title;
        this.movie.release_date = this.selected.release_date;
        this.movie.overview = this.selected.overview;
        this.movie.vote_averagge = this.selected.vote_average;
        this.movie.vote_count = this.selected.vote_count;
        this.movie.popularity = this.selected.popularity;
        this.movie.poster_path = this.selected.poster_path;
        this.movie.crew_list = data.crew.map(map => {
          let crew = <Crew>({
            name: map.name,
            job: map.job
          })
          return crew;
        })
        this.movie.cast_list = data.cast.map(map => {
          let cast = <Cast>({
            name: map.name,
            character: map.character,
            profile_path: map.profile_path
          })
          return cast;
        })
      })
  }
}
