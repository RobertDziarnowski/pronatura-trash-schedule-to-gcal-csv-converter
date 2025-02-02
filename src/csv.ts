import { json2csv } from "json-2-csv-ts";
import { ConvertedSchedule } from "./types";
import { capitalizeWords } from "./utils";

function createCsvRow(schedule: ConvertedSchedule[0]) {
  return {
    Subject: `Wywóz Śmieci Sztumska - ${capitalizeWords(schedule.type)}`,
    "Start Date": `${
      schedule.date.getMonth() + 1
    }/${schedule.date.getDate()}/${schedule.date.getFullYear()}`,
    "All Day Event": "True",
  };
}

export function createCsv(schedule: ConvertedSchedule) {
  const data = schedule.map(createCsvRow);

  return json2csv(data);
}
