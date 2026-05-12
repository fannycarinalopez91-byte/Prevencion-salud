// Capa de Dominio — Entidad Persona
// Principio S (SRP): modela exclusivamente los datos de una persona

export type TipoDocumento = 'DNI' | 'CUIL' | 'CUIT' | 'Pasaporte';
export type TipoAfiliacion = 'Particular' | 'Monotributo' | 'Empresa';

export interface Persona {
  readonly nombre: string;
  readonly apellido: string;
  readonly tipoDocumento: TipoDocumento;
  readonly numeroDocumento: string;
  readonly email: string;
  readonly telefono: string;
  readonly fechaNacimiento: string; // ISO date string (YYYY-MM-DD)
  readonly cantidadIntegrantesGrupoFamiliar: number;
  readonly tipoAfiliacion: TipoAfiliacion;
}
