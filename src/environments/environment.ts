// ─────────────────────────────────────────────────────────────────────────────
// Environment — DESARROLLO
//
// PASOS PARA CONFIGURAR EMAILJS:
// 1. Crear cuenta en https://www.emailjs.com (plan gratuito: 200 mails/mes)
// 2. Ir a Email Services → Add New Service → elegir tu proveedor (Gmail, etc.)
// 3. Copiar el "Service ID" y pegarlo en emailJs.serviceId
// 4. Ir a Email Templates → Create New Template → diseñar el template
//    Variables disponibles en el template:
//      {{nombre}}, {{apellido}}, {{email}}, {{telefono}}, {{tipoDocumento}},
//      {{numeroDocumento}}, {{tipoAfiliacion}}, {{cantidadIntegrantes}},
//      {{fechaNacimiento}}, {{planSeleccionado}}, {{mensaje}}, {{numeroCotizacion}}
// 5. Copiar el "Template ID" y pegarlo en emailJs.templateId
// 6. Ir a Account → General → Public Key y pegarlo en emailJs.publicKey
// ─────────────────────────────────────────────────────────────────────────────

export const environment = {
  production: false,

  emailJs: {
    serviceId: 'service_joeliq7',       // Ej: 'service_abc123'
    templateId: 'template_yvovtnw',     // Ej: 'template_xyz789'
    publicKey: 'X9PDuiUZoj-3n0Q5B',       // Ej: 'abcDEF1234567890'
  },
};
