// Caso de Uso — Enviar Solicitud de Cotización
// Principio S (SRP): orquesta únicamente el envío de una cotización.
// Principio D (DIP): depende de CotizacionServicePort (abstracción).

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CotizacionServicePort } from '../../domain/ports/cotizacion-service.port';
import { Cotizacion, CotizacionResult } from '../../domain/models/cotizacion.model';
import { Persona } from '../../domain/models/persona.model';

export interface SubmitCotizacionParams {
  readonly persona: Persona;
  readonly planId?: string;
  readonly planNombre?: string;
  readonly mensaje?: string;
}

@Injectable({ providedIn: 'root' })
export class SubmitCotizacionUseCase {
  private readonly cotizacionService = inject(CotizacionServicePort);

  execute(params: SubmitCotizacionParams): Observable<CotizacionResult> {
    const cotizacion: Cotizacion = {
      persona:       params.persona,
      planId:        params.planId,
      planNombre:    params.planNombre,
      mensaje:       params.mensaje,
      fechaSolicitud: new Date(),
    };
    return this.cotizacionService.enviar(cotizacion);
  }
}
