import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Meta } from '../models/meta.model';
import { MetaServiceService } from '../services/meta-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  metas$: Observable<Meta[]>;
  nuevaMeta = new Meta();
  guardando = false;
  error = '';

  constructor(private metaService: MetaServiceService) {
    this.metas$ = this.metaService.getMetas();
  }

  agregarMeta(): void {
    if (this.guardando || !this.nuevaMeta.meta.trim()) {
      return;
    }

    this.guardando = true;
    this.error = '';
    this.metaService.addMeta(this.nuevaMeta)
      .then(() => this.nuevaMeta = new Meta())
      .catch(() => this.error = 'No fue posible guardar la meta. Intenta de nuevo.')
      .finally(() => this.guardando = false);
  }

  eliminarMeta(meta: Meta): void {
    if (!meta.id) {
      return;
    }

    this.error = '';
    this.metaService.deleteMeta(meta.id)
      .catch(() => this.error = 'No fue posible eliminar la meta. Intenta de nuevo.');
  }
}
