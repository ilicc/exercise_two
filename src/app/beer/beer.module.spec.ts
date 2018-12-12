import { BeerModule } from './beer.module';

describe('BeerModule', () => {
  let beerModule: BeerModule;

  beforeEach(() => {
    beerModule = new BeerModule();
  });

  it('should create an instance', () => {
    expect(beerModule).toBeTruthy();
  });
});
