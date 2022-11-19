import { TestBed } from '@angular/core/testing';

import { SalvarGenerosService } from './service-genero.service';

describe('SalvarGenerosService', () => {
  let service: SalvarGenerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarGenerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
