import { Crew } from './crew';
import { Cast } from './cast';

export class Movie {
    original_title: string;
    release_date: string;
    overview: string;
    vote_averagge: number;
    vote_count: number;
    popularity: number;
    poster_path: string;
    crew_list: Array<Crew>;
    cast_list: Array<Cast>;
}