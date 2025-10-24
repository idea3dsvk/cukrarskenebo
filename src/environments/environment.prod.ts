export const environment = {
  production: true,
  adminPassword: process.env['ADMIN_PASSWORD'] || 'changeMe123!',
  apiUrl: 'https://api.cukrarske-nebo.sk',
  defaultLanguage: 'sk',
  maxCartItems: 100,
  enableAnalytics: true
};