/**
 * Niveles de log
 */
export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  Critical = 4,
}

/**
 * Tipos de error personalizados por dominio
 */
export enum ErrorTypeEnum {
  Wofloo = 'wofloo',
  CustomAuth = 'customauth',
  Supabase = 'supabase',
  Http = 'http',
  Unknown = 'unknown',
}
