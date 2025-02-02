export enum TrashType {
  BigTrash = "odpady wielkogabarytowe",
  BioTrash = "odpady bio",
  Glass = "szkło",
  Plastic = "plastik",
  Paper = "papier",
  MixedTrash = "odpady zmieszane",
}

export enum MonthInPolish {
  January = "Styczeń",
  February = "Luty",
  March = "Marzec",
  April = "Kwiecień",
  May = "Maj",
  June = "Czerwiec",
  July = "Lipiec",
  August = "Sierpień",
  September = "Wrzesień",
  October = "Październik",
  November = "Listopad",
  December = "Grudzień",
}

export type TrashSchedule = Array<{
  month: `${MonthInPolish}`;
  schedule: Array<{
    type: `${TrashType}`;
    days: Array<`${number}`>;
  }>;
}>;

export type ConvertedSchedule = Array<{
  type: `${TrashType}`;
  date: Date;
}>;
