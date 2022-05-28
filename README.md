# TranslinkJS

A typed Javascript Translink RTTI and GTFS API wrapper

## Installation

```
yarn add translinkjs
```

or

```
npm install translinkjs
```

## Usage

`translinkjs` currently supports both the Translink RTTI and GTFS (realtime) APIs, documentation for which can be found [here](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources).

To use the RTTI API:

```ts
import { RTTI } from "translinkjs";

const rtti = new RTTI("API_KEY");

const buses = await rtti.buses({ routeNumber: 99 });
const routes = await rtti.routesThroughStop(54877);
// etc...
```

To use the GTFS API:

```ts
import { TranslinkGTFS } from "translinkjs";

const gtfs = new TranslinkGTFS("API_KEY");

// There are three endpoints available through realtime GTFS:

// Trip updates (how on schedule each bus is)
const tripUpdates = await gtfs.tripUpdates();

// Vehicle positions (where each bus is)
const vehiclePositions = await gtfs.vehiclePositions();

// and Alerts
const alerts = await gtfs.alerts();
```

_You can get an API key [on Translink's website](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/register)_

## Structure

Each API endpoint response is turned into a typed object, which has JS-conventional and understandable property names. Some confusing values are also converted to more intuitive ones.

## Feedback

Found a bug? Want a feature? Feel free to create an issue, or contact me on Discord john!#2527.
