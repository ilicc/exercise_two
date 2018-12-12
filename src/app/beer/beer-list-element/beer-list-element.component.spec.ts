import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerListElementComponent } from './beer-list-element.component';

describe('BeerListElementComponent', () => {
  let component: BeerListElementComponent;
  let fixture: ComponentFixture<BeerListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeerListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
