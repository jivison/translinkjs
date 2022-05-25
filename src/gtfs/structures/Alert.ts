import { parseDateFromLong } from "../../helpers";
import {
  RawAlert,
  RawAlertFeedEntity,
  RawEntitySelector,
  RawTimerange,
  RawTranslatedString,
} from "../types/responses";

export class GTFSAlert {
  feedEntityID: string;
  activePeriods: Timerange[];
  effectedEntities: GTFSEffectedEntity[];
  cause: GTFSAlertCause;
  effect: GTFSAlertEffect;
  headerTranslations: GTFSTranslations;
  descriptionTranslations: GTFSTranslations;
  severityLevel: number;

  constructor(response: RawAlertFeedEntity) {
    this.feedEntityID = response.id;
    this.severityLevel = response.alert.severityLevel;

    this.cause = response.alert.cause as GTFSAlertCause;
    this.effect = response.alert.effect as GTFSAlertEffect;

    this.activePeriods = response.alert.activePeriod.map((t) =>
      Timerange.fromRaw(t)
    );

    this.effectedEntities = response.alert.informedEntity.map(
      (e) => new GTFSEffectedEntity(e)
    );

    this.headerTranslations = new GTFSTranslations(response.alert.headerText);
    this.descriptionTranslations = new GTFSTranslations(
      response.alert.descriptionText
    );
  }

  public description(lang = "en"): string {
    return this.descriptionTranslations.getTranslation(lang);
  }

  public header(lang = "en"): string {
    return this.headerTranslations.getTranslation(lang);
  }
}

export class Timerange {
  from: Date;
  to?: Date;

  constructor(from: Date, to?: Date) {
    this.from = from;
    this.to = to;
  }

  static fromRaw(tr: RawTimerange): Timerange {
    return {
      from: tr.start ? parseDateFromLong(tr.start) : undefined,
      to: tr.end ? parseDateFromLong(tr.end) : undefined,
    };
  }
}

export class GTFSEffectedEntity {
  agency: string;
  routeID: string;
  routeType: number; // Corresponds with route type in static data

  constructor(response: RawEntitySelector) {
    this.agency = response.agencyId;
    this.routeID = response.routeId;
    this.routeType = response.routeType;
  }
}

// From https://developers.google.com/transit/gtfs-realtime/gtfs-realtime-proto
export enum GTFSAlertCause {
  Unknown = 1,
  Other = 2, // Not machine-representable.
  TechnicalProblem = 3,
  Strike = 4, // Public transit agency employees stopped working.
  Demonstration = 5, // People are blocking the streets.
  Accident = 6,
  Holiday = 7,
  Weather = 8,
  Maintenance = 9,
  Construction = 10,
  PoliceActivity = 11,
  MedicalEmergency = 12,
}

// From https://developers.google.com/transit/gtfs-realtime/gtfs-realtime-proto
export enum GTFSAlertEffect {
  NoService = 1,
  ReducedService = 2,
  SignificantDelays = 3,
  Detour = 4,
  AdditionalService = 5,
  ModifiedService = 6,
  Other = 7,
  Unknown = 8,
  StopMoved = 9,
}

export class GTFSTranslations {
  private translations: { text: string; language: string }[];

  constructor(response: RawTranslatedString) {
    this.translations = response.translation;
  }

  getTranslation(lang: string): string {
    return this.translations.find((t) => t.language === lang)?.text;
  }
}
