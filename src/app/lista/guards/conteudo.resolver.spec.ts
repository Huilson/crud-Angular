import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { conteudoResolver } from './conteudo.resolver';

describe('conteudoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => conteudoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
