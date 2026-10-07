import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { Meta } from '../models/meta.model';
import { MetaServiceService } from '../services/meta-service.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let metaService: jasmine.SpyObj<MetaServiceService>;

  const metas: Meta[] = [
    { id: '1', meta: 'Ir a la luna' },
    { id: '2', meta: 'Subir el Everest' }
  ];

  beforeEach(async () => {
    metaService = jasmine.createSpyObj<MetaServiceService>('MetaServiceService', ['getMetas', 'addMeta', 'deleteMeta']);
    metaService.getMetas.and.returnValue(of(metas));
    metaService.addMeta.and.resolveTo();
    metaService.deleteMeta.and.resolveTo();

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
      providers: [{ provide: MetaServiceService, useValue: metaService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list the goals with their count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.goal').length).toBe(2);
    expect(compiled.textContent).toContain('Mis metas ( 2 )');
  });

  it('should add a goal through the service', () => {
    component.nuevaMeta.meta = 'Aprender Angular';
    component.agregarMeta();
    expect(metaService.addMeta).toHaveBeenCalledWith(jasmine.objectContaining({ meta: 'Aprender Angular' }));
  });

  it('should not add an empty goal', () => {
    component.nuevaMeta.meta = '   ';
    component.agregarMeta();
    expect(metaService.addMeta).not.toHaveBeenCalled();
  });

  it('should delete a goal through the service', () => {
    component.eliminarMeta(metas[0]);
    expect(metaService.deleteMeta).toHaveBeenCalledWith('1');
  });
});
