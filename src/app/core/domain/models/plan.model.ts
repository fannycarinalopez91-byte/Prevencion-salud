// Capa de Dominio — Entidad Plan
// Principio S (SRP): solo describe el concepto de Plan, sin lógica externa

export type TipoPlan = 'basico' | 'clasico' | 'premium';

export interface Plan {
  readonly id: string;
  readonly tipo: TipoPlan;
  readonly nombre: string;
  readonly descripcion: string;
  readonly precioMensual: number;
  readonly coberturas: readonly string[];
  readonly beneficios: readonly string[];
  readonly colorAccent: string;
  readonly destacado: boolean;
  readonly icono: string;
}
