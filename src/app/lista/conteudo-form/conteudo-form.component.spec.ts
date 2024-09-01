import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoFormComponent } from './conteudo-form.component';

describe('ConteudoFormComponent', () => {
  let component: ConteudoFormComponent;
  let fixture: ComponentFixture<ConteudoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteudoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
