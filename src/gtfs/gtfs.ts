import fetch from "node-fetch";
import * as gtfsRealtimeBindings from "gtfs-realtime-bindings";
import { GTFSTripUpdate } from "./structures/TripUpdate";
import { GTFSVehiclePosition } from "./structures/VehiclePosition";
import { GTFSAlert } from "./structures/Alert";

export class TranslinkGTFS {
  private baseURL = "https://gtfs.translink.ca/v2";

  constructor(private apikey: string) {}

  public async tripUpdates(): Promise<GTFSTripUpdate[]> {
    const rawTripUpdates = await this.fetchAndParseBuffer("realtime");

    return rawTripUpdates.map((fe) => new GTFSTripUpdate(fe));
  }

  public async vehiclePositions(): Promise<GTFSVehiclePosition[]> {
    const rawVehiclePositions = await this.fetchAndParseBuffer("position");

    return rawVehiclePositions.map((vp) => new GTFSVehiclePosition(vp));
  }

  public async alerts() {
    const rawAlerts = await this.fetchAndParseBuffer("alerts");

    return rawAlerts.map((a) => new GTFSAlert(a));
  }

  private parseRealtimeProtobuf(buffer: Buffer): Promise<any[]> {
    const feed =
      gtfsRealtimeBindings.transit_realtime.FeedMessage.decode(buffer);

    console.log(feed.entity[0]);

    return feed.entity;
  }

  private async fetchAndParseBuffer(type: string): Promise<any[]> {
    const response = await fetch(
      `${this.baseURL}/gtfs${type}?apikey=${this.apikey}`
    );

    const buffer = await response.buffer();

    return this.parseRealtimeProtobuf(buffer);
  }
}
