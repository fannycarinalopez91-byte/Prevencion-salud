// Adaptador de Infraestructura — Repositorio Mock de Planes
// Principio L (LSP): implementa PlanRepositoryPort y puede ser reemplazado
//   por una implementación HTTP sin modificar la capa de aplicación.
// Principio O (OCP): extendemos sin modificar el puerto del dominio.

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { PlanRepositoryPort } from '../../core/domain/ports/plan-repository.port';
import { Plan } from '../../core/domain/models/plan.model';

const PLANES_DATA: Plan[] = [
  {
    id: 'PLANA1',
    tipo: 'basico',
    nombre: 'PLAN A1:  Cobertura Esencial y Accesible',
    descripcion:
      'Ideal para quienes buscan una opción económica con el respaldo de una gran cartilla.',
    coberturas: [
      'Sistema: Atención exclusivamente a través de los prestadores de la cartilla.',
      'Internación: Habitación compartida.',
      'Consultas: Cobertura directa dentro de la cartilla (sin sistema de reintegros).',
      'Óptica: Incluye 1 par de anteojos estándar por año.',
      'Kinesiología: 25 sesiones incluidas.',
      'Asistencia al viajero: Cobertura de alcance nacional.'
    ],
    beneficios: [
      'Red de más de 2.000 médicos',
      'Guardia las 24 horas',
      'App de gestión digital',
      'Sin período de carencia en urgencias',
    ],
    colorAccent: '#4CAF82',
    destacado: false,
    icono: '🌿',
  },
  {
    id: 'PLANA2',
    tipo: 'clasico',
    nombre: 'PLAN A2: Flexibilidad y Mayor Confort',
    descripcion:
      'Ideal para quienes valoran la opción de atenderse con médicos fuera de la cartilla.',
    coberturas: [
      'Sistema: Abierto (permite consultas particulares con sistema de reintegro).',
      'Internación: Habitación individual garantizada.',
      'Ortodoncia: Cobertura al 100% hasta los 30 años.',
      'Óptica: Ampliado a lentes estándar, bifocales, multifocales o lentes de contacto.',
      'Cirugía refractiva: 50% de cobertura en la intervención.',
      'Asistencia al viajero: Cobertura nacional y en países limítrofes.'
    ],
    beneficios: [
      'Cobertura en todo el país',
      'Red de más de 6.000 médicos',
      'Derivación a especialistas sin derivación previa',
      'Cobertura familiar incluida',
      'Segunda opinión médica',
    ],
    colorAccent: '#2E86AB',
    destacado: true,
    icono: '⭐',
  },
  {
    id: 'PLANA4',
    tipo: 'premium',
    nombre: 'PLAN A4: Alta Gama y Cobertura Integral',
    descripcion:
      'Ideal para familias o personas que buscan tranquilidad total y prestaciones premium.',
    coberturas: [
      'Sistema: Abierto con reintegros en consultas médicas.',
      'Cirugía refractiva: Cobertura total del 100%.',
      'Odontología avanzada: Incluye cobertura en implantes odontológicos por reintegro.',
      'Maternidad: Incluye 2 ecografías avanzadas (3D, 4D o 5D) por embarazo.',
      'Estética: Incluye cobertura de cirugía estética por reintegro (carencia de 18 meses).',
      'Kinesiología: 40 sesiones anuales sin tope.'
    ],
    beneficios: [
      'Cobertura internacional de emergencias',
      'Reintegros por gastos médicos',
      'Sin topes de internación',
      'Acceso a clínicas de primer nivel',
      'Plan de bienestar y prevención',
      'Atención domiciliaria',
    ],
    colorAccent: '#7B2FBE',
    destacado: false,
    icono: '💎',
  },{
    id: 'PLANA5',
    tipo: 'premium',
    nombre: 'PLAN A5: El Plan Más Exclusivo (VIP)',
    descripcion:
      'Ideal para clientes exigentes que demandan la máxima calidad médica y confort hotelero.',
    precioMensual: 47500,
    coberturas: [
      'Internación: Habitación de categoría VIP.',
      'Ortodoncia: Prestacional sin límite de edad y por reintegro sin límite de edad.',
      'Medicamentos: Máximo descuento disponible en farmacias (50% de cobertura).',
      'Tratamientos especiales: 12 sesiones anuales de esclerosante/flebología con medicación incluida.',
      'Cirugía estética: Cobertura por reintegro con menor tiempo de espera (carencia de 12 meses).',
      'Asistencia al viajero: Cobertura completa a nivel nacional e internacional.'
    ],
    beneficios: [
      'Cobertura internacional de emergencias',
      'Reintegros por gastos médicos',
      'Sin topes de internación',
      'Acceso a clínicas de primer nivel',
      'Plan de bienestar y prevención',
      'Atención domiciliaria',
    ],
    colorAccent: '#7B2FBE',
    destacado: false,
    icono: '💎',
  }
];

@Injectable()
export class PlanMockRepository extends PlanRepositoryPort {
  override getAll(): Observable<Plan[]> {
    return of(PLANES_DATA);
  }

  override getById(id: string): Observable<Plan | undefined> {
    return of(PLANES_DATA.find((p) => p.id === id));
  }
}
