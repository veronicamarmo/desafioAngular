import { TestBed } from '@angular/core/testing';

import { SalvarUsuarioService } from './salvar-usuario.service';

describe('SalvarUsuarioService', () => {
  let service: SalvarUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalvarUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
