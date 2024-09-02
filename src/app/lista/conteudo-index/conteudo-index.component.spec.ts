import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoIndexComponent } from './conteudo-index.component';

describe('ConteudoIndexComponent', () => {
  let component: ConteudoIndexComponent;
  let fixture: ComponentFixture<ConteudoIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteudoIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteudoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
