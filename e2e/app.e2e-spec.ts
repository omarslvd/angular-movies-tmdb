import { AngularMoviesTmdbPage } from './app.po';

describe('angular-movies-tmdb App', () => {
  let page: AngularMoviesTmdbPage;

  beforeEach(() => {
    page = new AngularMoviesTmdbPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
