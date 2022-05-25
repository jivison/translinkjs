import { RawRoutePattern, RouteDirection } from "../types/apiResponses";
import parseKMZ from "parse2-kmz";

export class RoutePattern {
  patternID: string;
  destination: string;
  routeMapURL: string;
  direction: RouteDirection;

  constructor(response: RawRoutePattern) {
    this.patternID = response.PatternNo;
    this.destination = response.Destination;
    this.routeMapURL = response.RouteMap.Href;
    this.direction = response.Direction;
  }
}

export class RouteMap {
  rawKML: string;

  constructor(kml: any) {
    this.rawKML = kml;
  }

  static async fromURL(url: string): Promise<RouteMap> {
    const kml = await parseKMZ.toKML(url);

    return new RouteMap(kml);
  }
}
