import { Coordinates } from "../../rtti/types/apiParams";

export interface RawRealtimeFeedEntity {
  id: string;
  tripUpdate: RawTripUpdate;
}

export interface RawTripUpdate {
  stopTimeUpdate: RawStopTimeUpdate[];
  trip: RawTripDescriptor;
  vehicle: RawVehicleDescriptor;
  timestamp: RawLong;
}

export interface RawTripDescriptor {
  tripId: string;
  startDate: string;
  routeId: string;
  directionId: number;
}

export interface RawVehicleDescriptor {
  id: string;
  label: string;
}

export interface RawStopTimeUpdate {
  stopSequence: number;
  arrival: RawStopTimeEvent;
  departure: RawStopTimeEvent;
  stopId: string;
}

export interface RawStopTimeEvent {
  delay: number;
  time: RawLong;
}

export interface RawLong {
  low: number;
  high: number;
  unsigned: boolean;
}

export interface RawPositionFeedEntity {
  id: string;
  vehicle: RawVehiclePosition;
}

export interface RawVehiclePosition {
  trip: RawTripDescriptor;
  position: Coordinates;
  currentStopSequence: number;
  timestamp: RawLong;
  stopId: string;
  vehicle: RawVehicleDescriptor;
}

export interface RawAlertFeedEntity {
  id: string;
  alert: RawAlert;
}

export interface RawAlert {
  activePeriod: [RawTimerange];
  informedEntity: [RawEntitySelector];
  cause: number;
  effect: number;
  headerText: RawTranslatedString;
  descriptionText: RawTranslatedString;
  severityLevel: number;
}

export interface RawTimerange {
  start?: RawLong;
  end?: RawLong;
}

export interface RawEntitySelector {
  agencyId: string;
  routeId: string;
  routeType: number;
}

export interface RawTranslatedString {
  translation: {
    text: string;
    language: string;
  }[];
}
