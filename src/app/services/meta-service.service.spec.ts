import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

import { MetaServiceService } from './meta-service.service';

describe('MetaServiceService', () => {
  let service: MetaServiceService;
  let collection: jasmine.SpyObj<any>;
  let document: jasmine.SpyObj<any>;

  beforeEach(() => {
    document = jasmine.createSpyObj('AngularFirestoreDocument', ['delete']);
    document.delete.and.resolveTo();

    collection = jasmine.createSpyObj('AngularFirestoreCollection', ['valueChanges', 'add', 'doc']);
    collection.valueChanges.and.returnValue(of([]));
    collection.add.and.resolveTo({});
    collection.doc.and.returnValue(document);

    const firestore = jasmine.createSpyObj<AngularFirestore>('AngularFirestore', ['collection']);
    firestore.collection.and.returnValue(collection);

    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: firestore }]
    });
    service = TestBed.inject(MetaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read goals including the document id', () => {
    service.getMetas().subscribe();
    expect(collection.valueChanges).toHaveBeenCalledWith({ idField: 'id' });
  });

  it('should add a goal with only the meta field', async () => {
    await service.addMeta({ meta: '  Viajar a Japón  ' });
    expect(collection.add).toHaveBeenCalledWith({ meta: 'Viajar a Japón' });
  });

  it('should delete a goal by id', async () => {
    await service.deleteMeta('abc');
    expect(collection.doc).toHaveBeenCalledWith('abc');
    expect(document.delete).toHaveBeenCalled();
  });
});
