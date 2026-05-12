// Puerto de entrada — Repositorio de Planes
// Principios O (OCP) y D (DIP): la aplicación depende de esta abstracción,
// no de implementaciones concretas. Nuevas fuentes de datos no modifican el dominio.

import { Observable } from 'rxjs';
import { Plan } from '../models/plan.model';

export abstract class PlanRepositoryPort {
  abstract getAll(): Observable<Plan[]>;
  abstract getById(id: string): Observable<Plan | undefined>;
}
