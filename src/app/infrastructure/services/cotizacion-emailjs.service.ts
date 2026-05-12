// ─────────────────────────────────────────────────────────────────────────────
// Infrastructure — Adaptador EmailJS
//
// Principio D (DIP): implementa el puerto CotizacionServicePort definido en
//   el dominio. La capa de aplicación nunca importa esta clase directamente.
// Principio S (SRP): única responsabilidad — enviar la cotización vía EmailJS.
// Principio O (OCP): para cambiar el proveedor de email basta crear otro
//   adaptador sin tocar el dominio ni la capa de aplicación.
// ─────────────────────────────────────────────────────────────────────────────

import { Injectable } from '@angular/core';
import { Observable, from, catchError, map } from 'rxjs';
import emailjs from '@emailjs/browser';

import { CotizacionServicePort } from '../../core/domain/ports/cotizacion-service.port';
import { Cotizacion, CotizacionResult } from '../../core/domain/models/cotizacion.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CotizacionEmailJSService implements CotizacionServicePort {

  /** Genera un número de cotización único en el formato PS-YYYYMMDD-XXXXX */
  private generarNumeroCotizacion(): string {
    const now = new Date();
    const fecha = now.toISOString().slice(0, 10).replace(/-/g, '');
    const aleatorio = Math.floor(10000 + Math.random() * 90000);
    return `PS-${fecha}-${aleatorio}`;
  }

  enviar(cotizacion: Cotizacion): Observable<CotizacionResult> {
    const numeroCotizacion = this.generarNumeroCotizacion();
    const { persona } = cotizacion;

    // Parámetros que se inyectarán en el template de EmailJS.
    // Los nombres deben coincidir exactamente con las variables {{...}} del template.
    const templateParams = {
      numero_cotizacion:       numeroCotizacion,
      nombre:                  persona.nombre,
      apellido:                persona.apellido,
      tipo_documento:          persona.tipoDocumento,
      numero_documento:        persona.numeroDocumento,
      email:                   persona.email,
      telefono:                persona.telefono,
      fecha_nacimiento:        persona.fechaNacimiento,
      cantidad_integrantes:    persona.cantidadIntegrantesGrupoFamiliar.toString(),
      tipo_afiliacion:         persona.tipoAfiliacion,
      plan_seleccionado:       cotizacion.planNombre ?? 'Sin plan seleccionado',
      mensaje:                 cotizacion.mensaje ?? '',
      fecha_solicitud:         cotizacion.fechaSolicitud.toLocaleDateString('es-AR', {
                                 day: '2-digit', month: '2-digit', year: 'numeric',
                               }),
    };

    const send$ = from(
      emailjs.send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        templateParams,
        environment.emailJs.publicKey,
      )
    );

    return send$.pipe(
      map(() => ({
        exito: true,
        mensaje: '¡Tu solicitud fue enviada con éxito! Nos contactaremos pronto.',
        numeroCotizacion,
      } satisfies CotizacionResult)),

      catchError((error: unknown) => {
        console.error('[CotizacionEmailJSService] Error al enviar:', error);
        // Re-lanzamos como un resultado fallido para que el form lo muestre
        return [{
          exito: false,
          mensaje: 'Ocurrió un error al enviar tu solicitud. Por favor intentá de nuevo.',
        } satisfies CotizacionResult];
      }),
    );
  }
}
