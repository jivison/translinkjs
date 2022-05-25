import { fromUnixTime, parse } from "date-fns";
import { RawLong } from "./gtfs/types/responses";

export function joinPath(path1: string, path2: string): string {
  return (
    (path1.endsWith("/") ? path1 : path1 + "/") +
    (path2.startsWith("/") ? path2.slice(1) : path2)
  );
}

export function uniquify<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function parseDateTime(string: string): Date {
  return parse(string, "KK:mma yyyy-MM-dd", new Date());
}

export function parseTime(string: string): Date {
  return parse(string, "KK:mm:ss a", new Date());
}

export function parseDateFromLong(long?: RawLong): Date {
  return fromUnixTime(long.low);
}

export function cleanRouteNumber(routeNumber: string): string {
  let newRouteNumber = "";
  let seenNonZero = false;

  for (const char of routeNumber.split("")) {
    seenNonZero = seenNonZero || char !== "0";

    if (!seenNonZero && char === "0") continue;

    newRouteNumber += char;
  }

  return newRouteNumber;
}
