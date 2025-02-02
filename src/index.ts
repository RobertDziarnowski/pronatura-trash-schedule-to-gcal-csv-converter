#! /usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { Command } from "commander";

import { parseCalendar } from "./calendar";
import { fetchDetails } from "./fetchCalendar";
import { createCsv } from "./csv";

const baseApiUrl =
  "https://zs5cv4ng75.execute-api.eu-central-1.amazonaws.com/prod";

async function getCsv(street: string, buildingNumber: string, output?: string) {
  console.log(`Fetching schedule for ${street} ${buildingNumber}`);

  const { trashSchedule, year } = await fetchDetails(
    baseApiUrl,
    street,
    buildingNumber
  );

  console.log(`Parsing schedule for ${street} ${buildingNumber}`);

  const parsedSchedule = parseCalendar(trashSchedule, year);

  console.log(`Creating CSV for ${street} ${buildingNumber}`);

  const csv = createCsv(parsedSchedule);

  const outputFile =
    output ??
    path.join(
      process.cwd(),
      `trash-schedule-${street}-${buildingNumber}-${year}.csv`
    );

  console.log(
    `Writing CSV to file for ${street} ${buildingNumber} to ${outputFile}`
  );

  fs.writeFileSync(outputFile, csv, {});

  return outputFile;
}

const program = new Command();

program
  .version("1.0.0")
  .description("Convert Pronatura trash schedule to Google Calendar CSV")
  .requiredOption("-s, --street <value>", "Street name")
  .requiredOption("-b, --building <value>", "Building number")
  .option("-a, --api-url <value>", "API URL", baseApiUrl)
  .option(
    "-o, --output <value>",
    "Output file name defaults to trash-schedule-<street>-<building>-<year>.csv"
  )
  .parse(process.argv);

const options = program.opts();

getCsv(options.street, options.building, options.output)
  .then((outputFile) =>
    console.log(
      `Successfully created CSV for ${options.street} ${options.building} to ${outputFile}`
    )
  )
  .catch((error) => console.log("Failed to create CSV", { error }));
