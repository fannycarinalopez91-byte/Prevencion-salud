// Caso de Uso — Obtener Planes
// Principio S (SRP): única responsabilidad, orquestar la obtención de planes.
// Principio D (DIP): depende de la abstracción PlanRepositoryPort.

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PlanRepositoryPort } from '../../domain/ports/plan-repository.port';
import { Plan } from '../../domain/models/plan.model';

@Injectable({ providedIn: 'root' })
export class GetPlanesUseCase {
  private readonly planRepository = inject(PlanRepositoryPort);

  execute(): Observable<Plan[]> {
    return this.planRepository.getAll();
  }
}
