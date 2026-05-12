// Adaptador de Infraestructura — Servicio Mock de Cotización
// Principio L (LSP): implementa CotizacionServicePort.
//   Se reemplazará por un adaptador HTTP real sin afectar la capa de aplicación.

import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { CotizacionServicePort } from '../../core/domain/ports/cotizacion-service.port';
import { Cotizacion, CotizacionResult } from '../../core/domain/models/cotizacion.model';

@Injectable()
export class CotizacionMockService extends CotizacionServicePort {
  override enviar(cotizacion: Cotizacion): Observable<CotizacionResult> {
    // Simula una llamada HTTP con latencia de 1.5 segundos
    const numeroCotizacion = `PS-${Date.now()}`;
    const resultado: CotizacionResult = {
      exito: true,
      mensaje: `Tu solicitud fue recibida con éxito. Te contactaremos a ${cotizacion.persona.email} en las próximas 24 hs.`,
      numeroCotizacion,
    };
    return of(resultado).pipe(delay(1500));
  }
}
