import { cleanRouteNumber, parseDateTime, parseTime } from "../../helpers";
import {
  RawNextBus,
  RawNextBusSchedule,
  RouteDirection,
} from "../types/apiResponses";

export class NextBus {
  routeNumber: string;
  routeName: string;
  direction: RouteDirection;
  routeMapURL: string;
  schedules: NextBusSchedule[];

  constructor(response: RawNextBus) {
    this.routeNumber = cleanRouteNumber(response.RouteNo);
    this.routeName = response.RouteName;
    this.direction = response.Direction;
    this.routeMapURL = response.RouteMap.Href;

    this.schedules = response.Schedules.map((p) => new NextBusSchedule(p));
  }
}

export class NextBusSchedule {
  patternID: string;
  destination: string;
  expectedLeaveTime: Date;
  minutesToLeave: number;
  status: "early" | "late" | "on time";
  isTripCancelled: boolean;
  isStopCancelled: boolean;
  isAddedTrip: boolean;
  isAddedStop: boolean;
  lastUpdated: Date;

  constructor(response: RawNextBusSchedule) {
    this.patternID = response.Pattern;
    this.destination = response.Destination;
    this.expectedLeaveTime = parseDateTime(response.ExpectedLeaveTime);
    this.minutesToLeave = response.ExpectedCountdown;
    this.status =
      response.ScheduleStatus === "+"
        ? "late"
        : response.ScheduleStatus === "-"
        ? "early"
        : "on time";
    this.isTripCancelled = response.CancelledTrip;
    this.isStopCancelled = response.CancelledStop;
    this.isAddedTrip = response.AddedTrip;
    this.isAddedStop = response.AddedStop;
    this.lastUpdated = parseTime(response.LastUpdate);
  }

  get isCancelled(): boolean {
    return this.isStopCancelled || this.isStopCancelled;
  }
}
