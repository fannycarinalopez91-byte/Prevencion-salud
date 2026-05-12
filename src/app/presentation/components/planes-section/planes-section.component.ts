// Principio S (SRP): orquesta la visualización de los planes disponibles.
// Usa Signals para gestionar estado reactivo: planes cargados y plan seleccionado.

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { GetPlanesUseCase } from '../../../core/application/use-cases/get-planes.use-case';
import { Plan } from '../../../core/domain/models/plan.model';
import { PlanCardComponent } from '../plan-card/plan-card.component';

@Component({
  selector: 'app-planes-section',
  standalone: true,
  imports: [PlanCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './planes-section.component.html',
  styleUrl: './planes-section.component.css',
})
export class PlanesSectionComponent implements OnInit {
  private readonly getPlanesUseCase = inject(GetPlanesUseCase);

  readonly planes = signal<Plan[]>([]);
  readonly planSeleccionadoId = signal<string | null>(null);

  readonly planSeleccionado = output<Plan | null>();

  ngOnInit(): void {
    this.getPlanesUseCase.execute().subscribe((planes) => {
      this.planes.set(planes);
    });
  }

  onPlanSeleccionado(plan: Plan): void {
    // Toggle: si ya estaba seleccionado, deselecciona
    const nuevo = this.planSeleccionadoId() === plan.id ? null : plan.id;
    this.planSeleccionadoId.set(nuevo);
    this.planSeleccionado.emit(nuevo ? plan : null);
  }
}
