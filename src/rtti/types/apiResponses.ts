export type RouteOperatingCompany = "CMBC";
export type RouteDirection = "NORTH" | "SOUTH" | "EAST" | "WEST";

export interface RawRouteDetails {
  RouteNo: string;
  Name: string;
  OperatingCompany: RouteOperatingCompany;
  Patterns: RawRoutePattern[];
}

export interface RawRoutePattern {
  PatternNo: string;
  Destination: string;
  RouteMap: RawRouteMap;
  Direction: RouteDirection;
}

export interface RawRouteMap {
  Href: string;
}

export interface RawNextBus {
  RouteNo: string;
  RouteName: string;
  Direction: RouteDirection;
  RouteMap: RawRouteMap;
  Schedules: RawNextBusSchedule[];
}

export interface RawNextBusSchedule {
  Pattern: string;
  Destination: string;
  ExpectedLeaveTime: string;
  ExpectedCountdown: number;
  ScheduleStatus: " " | "*" | "+" | "-"; // + means late, - means early, " " and "*" mean on time
  CancelledTrip: boolean;
  CancelledStop: boolean;
  AddedTrip: boolean;
  AddedStop: boolean;
  LastUpdate: string;
}

export interface RawStopDetails {
  StopNo: number;
  Name: string;
  BayNo: "N" | string; // N means no bay
  City: string;
  OnStreet: string;
  AtStreet: string;
  Latitude: number;
  Longitude: number;
  WheelchairAccess: 0 | 1;
  Distance: -1 | number; // Distance of -1 means exact location (used when requestion stop details)
  Routes: string;
}

export interface RawBusDetails {
  VehicleNo: string;
  TripId: number;
  RouteNo: string;
  Direction: RouteDirection;
  Destination: string;
  Pattern: string;
  Latitude: number;
  Longitude: number;
  RecordedTime: string;
  RouteMap: RawRouteMap;
}
