# TranslinkJS

## Installation

```
yarn add translinkjs
```

or

```
npm install translinkjs
```

## Usage

`translinkjs` currently supports the Translink RTTI API, documentation for which can be found [here](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/rtti).

To initialize an instance of the API:

```ts
import { RTTI } from "translinkjs";

const rtti = new RTTI("API_KEY");
```

_You can get an API key [on Translink's website](https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/register)_

## Feedback

Found a bug? Want a feature? Feel free to create an issue, or contact me on Discord john!#2527.
