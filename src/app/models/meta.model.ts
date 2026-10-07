/**
 * Representa un documento de la colección `metas` en Firestore.
 * El único campo persistido es `meta`; `id` es el identificador del documento.
 */
export class Meta {
  id?: string;
  meta: string;

  constructor(meta = '') {
    this.meta = meta;
  }
}
