import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  private readonly metasCollection: AngularFirestoreCollection<Meta>;

  constructor(private firestore: AngularFirestore) {
    this.metasCollection = this.firestore.collection<Meta>('metas', ref => ref.orderBy('meta'));
  }

  /** Lectura: escucha en tiempo real la colección `metas`, incluyendo el id de cada documento. */
  getMetas(): Observable<Meta[]> {
    return this.metasCollection.valueChanges({ idField: 'id' });
  }

  /** Alta: agrega un documento con el único campo `meta`. */
  addMeta(meta: Meta): Promise<unknown> {
    return this.metasCollection.add({ meta: meta.meta.trim() });
  }

  /** Eliminación: borra el documento por su id. */
  deleteMeta(id: string): Promise<void> {
    return this.metasCollection.doc(id).delete();
  }
}
