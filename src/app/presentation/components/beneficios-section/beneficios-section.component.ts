import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Beneficio {
  readonly icono: string;
  readonly titulo: string;
  readonly descripcion: string;
}

@Component({
  selector: 'app-beneficios-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './beneficios-section.component.html',
  styleUrl: './beneficios-section.component.css',
})
export class BeneficiosSectionComponent {
  readonly beneficios: Beneficio[] = [
    {
      icono: '🏥',
      titulo: 'Red médica nacional',
      descripcion:
        'Accedé a más de 6.000 profesionales y 400 clínicas en todo el país, sin restricciones geográficas.',
    },
    {
      icono: '⚡',
      titulo: 'Respuesta inmediata',
      descripcion:
        'Guardia de urgencias disponible las 24 horas, los 365 días del año. Tu salud no espera.',
    },
    {
      icono: '📱',
      titulo: 'Gestión 100% digital',
      descripcion:
        'Pedí turnos, consultá tu cartilla y gestioná reintegros desde la app, sin papeles ni filas.',
    },
    {
      icono: '💊',
      titulo: 'Descuentos en farmacias',
      descripcion:
        'Ahorrá entre el 30% y el 80% en medicamentos según tu plan, en más de 5.000 farmacias adheridas.',
    },
    {
      icono: '👨‍👩‍👧',
      titulo: 'Cobertura familiar',
      descripcion:
        'Protegé a toda tu familia bajo un mismo plan, con tarifas especiales por grupo familiar.',
    },
    {
      icono: '🌍',
      titulo: 'Emergencias en el exterior',
      descripcion:
        'Viajá tranquilo con cobertura internacional de emergencias médicas incluida en el Plan Premium.',
    },
  ];
}
