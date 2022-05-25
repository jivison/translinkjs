export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function isCoordinates(coords: any): coords is Coordinates {
  return coords.latitude !== undefined && coords.longitude !== undefined;
}

export interface StopsParams {
  coordinates: Coordinates;
  radiusInMeters?: number;
  routeNumber?: string;
}

export interface BusesParams {
  stopNumber?: string | number;
  routeNumber?: string | number;
}
