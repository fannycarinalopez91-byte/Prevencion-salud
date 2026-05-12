// Principio S (SRP): solo renderiza la información de un plan.
// Principio O (OCP): el componente es extensible vía inputs sin modificar su lógica.
// Principio I (ISP): usa únicamente el input 'plan' y 'seleccionado'.

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Plan } from '../../../core/domain/models/plan.model';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css',
})
export class PlanCardComponent {
  readonly plan = input.required<Plan>();
  readonly seleccionado = input<boolean>(false);

  readonly planSeleccionado = output<Plan>();

  readonly btnLabel = computed(() =>
    this.seleccionado() ? '✓ Plan seleccionado' : 'Seleccionar plan'
  );

  onSeleccionar(): void {
    this.planSeleccionado.emit(this.plan());
  }
}
