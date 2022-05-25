import { Base } from "./base";
import { BusDetails } from "./structures/BusDetails";
import { NextBus } from "./structures/NextBus";
import { RouteDetails } from "./structures/RouteDetails";
import { RouteMap } from "./structures/RoutePattern";
import { SearchStopDetails, StopDetails } from "./structures/StopDetails";
import { BusesParams, StopsParams } from "./types/apiParams";
import {
  RawBusDetails,
  RawNextBus,
  RawRouteDetails,
  RawStopDetails,
} from "./types/apiResponses";

export class RTTI extends Base {
  protected baseURL = "http://api.translink.ca/RTTIAPI/V1/";

  public async routesThroughStop(stopNumber: string | number) {
    const raw = await this.request<RawRouteDetails[]>("routes", { stopNumber });

    return raw.map((r) => new RouteDetails(r));
  }

  public async routeDetails(
    routeNumber: string | number
  ): Promise<RouteDetails> {
    const raw = await this.request<RawRouteDetails>(`routes/${routeNumber}`);

    return new RouteDetails(raw);
  }

  public async stopDetails(stopNumber: string | number): Promise<StopDetails> {
    const raw = await this.request<RawStopDetails>(`stops/${stopNumber}`);

    return new StopDetails(raw);
  }

  public async nextBus(stopNumber: string | number): Promise<NextBus[]> {
    const raw = await this.request<RawNextBus[]>(
      `stops/${stopNumber}/estimates`
    );

    return raw.map((r) => new NextBus(r));
  }

  public async stops(params: StopsParams): Promise<SearchStopDetails[]> {
    const raw = await this.request<RawStopDetails[]>("stops", params);

    return raw.map((r) => new SearchStopDetails(r));
  }

  public async busDetails(busNumber: string | number): Promise<BusDetails> {
    const raw = await this.request<RawBusDetails>(`buses/${busNumber}`);

    return new BusDetails(raw);
  }

  public async buses(params: BusesParams): Promise<BusDetails[]> {
    const raw = await this.request<RawBusDetails[]>("buses", params);

    return raw.map((b) => new BusDetails(b));
  }

  public async fetchRouteMap(routeMapURL: string): Promise<RouteMap> {
    return await RouteMap.fromURL(routeMapURL);
  }
}
