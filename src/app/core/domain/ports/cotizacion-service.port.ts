// Puerto de salida — Servicio de Cotización
// Principios I (ISP) y D (DIP): interfaz mínima y específica para el envío de cotizaciones.
// Permite sustituir el adaptador (mock, HTTP, email, etc.) sin tocar el dominio.

import { Observable } from 'rxjs';
import { Cotizacion, CotizacionResult } from '../models/cotizacion.model';

export abstract class CotizacionServicePort {
  abstract enviar(cotizacion: Cotizacion): Observable<CotizacionResult>;
}
