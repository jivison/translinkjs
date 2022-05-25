import { cleanRouteNumber, uniquify } from "../../helpers";
import { RawRouteDetails, RouteOperatingCompany } from "../types/apiResponses";
import { RoutePattern } from "./RoutePattern";

export class RouteDetails {
  routeNumber: string;
  name: string;
  operatingCompany: RouteOperatingCompany;
  patterns: RoutePattern[];

  constructor(response: RawRouteDetails) {
    this.routeNumber = cleanRouteNumber(response.RouteNo);
    this.name = response.Name;
    this.operatingCompany = response.OperatingCompany;

    this.patterns = response.Patterns.map((p) => new RoutePattern(p));
  }

  get destinations(): string[] {
    return uniquify(this.patterns.map((p) => p.destination));
  }
}
