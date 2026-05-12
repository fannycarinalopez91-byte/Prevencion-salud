// Configuración principal de la aplicación Angular
// Principio D (DIP): registramos los adaptadores de infraestructura como providers,
//   vinculando las abstracciones (ports) a sus implementaciones concretas.

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { PlanRepositoryPort } from './core/domain/ports/plan-repository.port';
import { PlanMockRepository } from './infrastructure/repositories/plan-mock.repository';
import { CotizacionServicePort } from './core/domain/ports/cotizacion-service.port';
import { CotizacionEmailJSService } from './infrastructure/services/cotizacion-emailjs.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),

    // ═══════════════════════════════════════════════════════════════
    // Binding de puertos hexagonales → adaptadores de infraestructura
    // Para conectar a una API real: reemplazar solo estas dos líneas.
    // ═══════════════════════════════════════════════════════════════
    {
      provide: PlanRepositoryPort,
      useClass: PlanMockRepository,
    },
    {
      provide: CotizacionServicePort,
      useClass: CotizacionEmailJSService,
    },
  ],
};
