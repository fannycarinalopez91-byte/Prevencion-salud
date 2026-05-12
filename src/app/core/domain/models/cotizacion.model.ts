// Capa de Dominio — Entidad Cotizacion y resultado
// Principio S (SRP): encapsula los datos de una solicitud de cotización

import { Persona } from './persona.model';

export interface Cotizacion {
  readonly persona: Persona;
  readonly planId?: string;
  readonly planNombre?: string;
  readonly mensaje?: string;
  readonly fechaSolicitud: Date;
}

export interface CotizacionResult {
  readonly exito: boolean;
  readonly mensaje: string;
  readonly numeroCotizacion?: string;
}
