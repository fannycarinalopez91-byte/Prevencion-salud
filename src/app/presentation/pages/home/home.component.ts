// Página principal — orquesta todos los componentes de la UI
// Principio S (SRP): coordina la comunicación entre secciones (planes ↔ formulario).
// Usa un Signal para propagar el plan seleccionado al formulario de cotización.

import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { PlanesSectionComponent } from '../../components/planes-section/planes-section.component';
import { BeneficiosSectionComponent } from '../../components/beneficios-section/beneficios-section.component';
import { CotizacionFormComponent } from '../../components/cotizacion-form/cotizacion-form.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Plan } from '../../../core/domain/models/plan.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    PlanesSectionComponent,
    BeneficiosSectionComponent,
    CotizacionFormComponent,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Signal que fluye desde planes-section → cotizacion-form
  readonly planSeleccionado = signal<Plan | null>(null);

  onPlanSeleccionado(plan: Plan | null): void {
    this.planSeleccionado.set(plan);
    if (plan) {
      // Smooth scroll al formulario al seleccionar un plan
      setTimeout(() => {
        document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }

  onPlanQuitado(): void {
    this.planSeleccionado.set(null);
  }
}
