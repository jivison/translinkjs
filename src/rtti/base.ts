import { stringify } from "query-string";
import { joinPath } from "../helpers";
import fetch from "node-fetch";
import { isCoordinates } from "./types/apiParams";
import { RTTIAPIError } from "./types/errors";

export type KeyValueMap = {
  [key: string]: any;
};

export abstract class Base {
  protected abstract baseURL: string;

  constructor(private apikey: string) {}

  protected async request<T>(path: string, params?: KeyValueMap): Promise<T> {
    const url = `${joinPath(this.baseURL, path)}?${this.params(params)}`;

    const response = await fetch(url, {
      headers: this.headers(),
    });

    const parsed = await response.json();

    if (parsed.Message && parsed.Code) throw new RTTIAPIError(parsed);

    return parsed as T;
  }

  protected headers(headers: KeyValueMap = {}): KeyValueMap {
    return {
      accept: "application/JSON",
      ...headers,
    };
  }

  protected params(params: KeyValueMap = {}): string {
    return stringify(this.renameParams({ apiKey: this.apikey, ...params }));
  }

  private renameParams(params: KeyValueMap): KeyValueMap {
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (key === "stopNumber") {
        acc["stopNo"] = value;
      } else if (key === "routeNumber") {
        acc["routeNo"] = value;
      } else if (key === "radiusInMeters") {
        acc["radius"] = value;
      } else if (key === "coordinates" && isCoordinates(value)) {
        acc["lat"] = value.latitude;
        acc["long"] = value.longitude;
      } else {
        acc[key] = value;
      }

      return acc;
    }, {} as KeyValueMap);
  }
}
