export interface CheckinPayloadRequest {
  FullName?: string;          // nombre completo del usuario
  IdCompany: number;
  UserDeviceId: string;
  CIOTDeviceId: number;
  DigitalSignature: string;
  Note: string;
  TimezoneOffset: number;
  LocalDateTime: string;    
  Latitude: number;
  Longitude: number;
  GeoAccuracy: number;
  GeoAddress: string;
  GeoCountry: string;
  GeoCity: string;
  GeoDevice: string;
  GeoIP: string;
}
