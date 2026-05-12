// ─────────────────────────────────────────────────────────────────────────────
// Environment — PRODUCCIÓN
// Reemplazar los valores con las credenciales reales de EmailJS antes de
// hacer el build de producción (ng build --configuration production).
// ─────────────────────────────────────────────────────────────────────────────

export const environment = {
  production: true,

  emailJs: {
    serviceId: 'TU_SERVICE_ID_PROD',
    templateId: 'TU_TEMPLATE_ID_PROD',
    publicKey: 'TU_PUBLIC_KEY_PROD',
  },
};
