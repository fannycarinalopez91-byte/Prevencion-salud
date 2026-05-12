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
    nombre: 'PLAN A1',
    descripcion:
      'Ideal para personas sanas que buscan cobertura esencial ante imprevistos médicos cotidianos.',
    precioMensual: 14500,
    coberturas: [
      'Cobertura sin copagos.',
      'Prótesis nacionales con 100% de coberturas.',
      'Emergencias y urgencias las 24 hs.',
      'Internación clínica y quirúrgica sin costos extras ni tope de días.',
      'Consultorio médico virtual.',
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
    nombre: 'PLAN A2',
    descripcion:
      'Cobertura completa para vos y tu familia, con internaciones, especialistas y odontología preventiva.',
    precioMensual: 28900,
    coberturas: [
      'Consultas con médicos clínicos y especialistas.',
      'Internación con habitaciones privadas.',
      'Consultas a domicilio.',
      'Prácticas de laboratorio.',
      'Consultas (Psiquiatría y Psicología).'
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
    nombre: 'PLAN A4',
    descripcion:
      'La cobertura más completa del mercado. Atención de alta complejidad, óptica y cobertura internacional.',
    precioMensual: 47500,
    coberturas: [
      'Cartilla con prestadores de prestigio nacional.',
      '100% cobertura en cirugía refractiva.',
      'Cobertura kinesio-fisioterapia.',
      'Amplia cobertura en odontología y óptica.',
      'Asistencia al viajero en países limítrofes.'
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
    nombre: 'PLAN A5',
    descripcion:
      'La cobertura más completa del mercado. Atención de alta complejidad, óptica y cobertura internacional.',
    precioMensual: 47500,
    coberturas: [
      'Todos los beneficios de A4.',
      '100% cobertura estética y refractaria.',
      'Cobertura kinesio-fisioterapia.',
      'Amplia cobertura en flebología y óptica.',
      'Cobertura amplia en implantes y prótesis odontológicas.',
      'Descuentos en farmacias de 50%.'
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
