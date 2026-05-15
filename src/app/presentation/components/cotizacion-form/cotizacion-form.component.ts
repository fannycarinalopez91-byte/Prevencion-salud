// Componente de Formulario de Cotización
// Principio S (SRP): gestiona únicamente la recolección y envío de datos del formulario.
// Principio D (DIP): delega el envío al SubmitCotizacionUseCase (abstracción).
// Usa Signals para estado reactivo local (sin necesidad de Subject/BehaviorSubject).

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubmitCotizacionUseCase, SubmitCotizacionParams } from '../../../core/application/use-cases/submit-cotizacion.use-case';
import { Plan } from '../../../core/domain/models/plan.model';
import { Persona, TipoAfiliacion, TipoDocumento } from '../../../core/domain/models/persona.model';
import { CotizacionResult } from '../../../core/domain/models/cotizacion.model';

@Component({
  selector: 'app-cotizacion-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cotizacion-form.component.html',
  styleUrl: './cotizacion-form.component.css',
})
export class CotizacionFormComponent {
  // Input signal: plan seleccionado desde el padre
  readonly planSeleccionado = input<Plan | null>(null);

  // Output para quitar el plan seleccionado
  readonly planQuitado = output<void>();

  private readonly fb = inject(FormBuilder);
  private readonly submitCotizacion = inject(SubmitCotizacionUseCase);

  // Signals de estado local del formulario
  readonly enviando = signal(false);
  readonly resultado = signal<CotizacionResult | null>(null);
  readonly errorEnvio = signal<string | null>(null);

  readonly fechaMaxima = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return d.toISOString().split('T')[0];
  })();

  readonly fechaMinima = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 100);
    return d.toISOString().split('T')[0];
  })();

  // Opciones de los desplegables
  readonly tiposDocumento: TipoDocumento[] = ['DNI', 'CUIL', 'CUIT', 'Pasaporte'];
  readonly tiposAfiliacion: { valor: TipoAfiliacion; label: string }[] = [
    { valor: 'Particular',   label: 'Socio Particular' },
    { valor: 'Monotributo',  label: 'Monotributista' },
    { valor: 'Empresa',      label: 'Convenio de Empresa' },
  ];

  readonly form: FormGroup = this.fb.group({
    nombre:                        ['', [Validators.required, Validators.minLength(2)]],
    apellido:                      ['', [Validators.required, Validators.minLength(2)]],
    tipoDocumento:                 ['', Validators.required],
    numeroDocumento:               ['', [Validators.required, Validators.pattern(/^\d{6,11}$/)]],
    email:                         ['', [Validators.required, Validators.email]],
    telefono:                      ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-]{8,15}$/)]],
    fechaNacimiento: ['', [Validators.required, (ctrl: AbstractControl) => {
      if (!ctrl.value) return null;
      const nacimiento = new Date(ctrl.value + 'T00:00:00');
      const limite = new Date();
      limite.setFullYear(limite.getFullYear() - 18);
      return nacimiento <= limite ? null : { edadMinima: true };
    }]],
    cantidadIntegrantesGrupoFamiliar: ['', Validators.required],
    tipoAfiliacion:                ['', Validators.required],
    mensaje:                       [''],
  });

  hasError(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.errorEnvio.set(null);

    const v = this.form.value;
    const persona: Persona = {
      nombre:                           v.nombre.trim(),
      apellido:                         v.apellido.trim(),
      tipoDocumento:                    v.tipoDocumento as TipoDocumento,
      numeroDocumento:                  v.numeroDocumento.trim(),
      email:                            v.email.trim().toLowerCase(),
      telefono:                         v.telefono.trim(),
      fechaNacimiento:                  v.fechaNacimiento,
      cantidadIntegrantesGrupoFamiliar: Number(v.cantidadIntegrantesGrupoFamiliar),
      tipoAfiliacion:                   v.tipoAfiliacion as TipoAfiliacion,
    };

    const params: SubmitCotizacionParams = {
      persona,
      planId:     this.planSeleccionado()?.id,
      planNombre: this.planSeleccionado()?.nombre,
      mensaje:    v.mensaje?.trim() || undefined,
    };

    this.submitCotizacion
      .execute(params)
      .subscribe({
        next: (res) => {
          this.enviando.set(false);
          this.resultado.set(res);
        },
        error: () => {
          this.enviando.set(false);
          this.errorEnvio.set(
            'Ocurrió un error al enviar tu solicitud. Por favor, intentá nuevamente.'
          );
        },
      });
  }

  quitarPlan(): void {
    this.planQuitado.emit();
  }

  resetForm(): void {
    this.form.reset({
      nombre: '',
      apellido: '',
      tipoDocumento: '',
      numeroDocumento: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      cantidadIntegrantesGrupoFamiliar: '',
      tipoAfiliacion: '',
      mensaje: '',
    });
    this.resultado.set(null);
    this.errorEnvio.set(null);
  }
}
