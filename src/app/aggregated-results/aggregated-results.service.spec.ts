import { TestBed } from '@angular/core/testing';

import { AggregatedResultsService } from './aggregated-results.service';

describe('AggregatedResultsService', () => {
  let service: AggregatedResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AggregatedResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
