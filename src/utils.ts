import { MonthInPolish } from "./types";

export function translateMonthsToEnglish(month: `${MonthInPolish}`): string {
  switch (month) {
    case MonthInPolish.January:
      return "January";
    case MonthInPolish.February:
      return "February";
    case MonthInPolish.March:
      return "March";
    case MonthInPolish.April:
      return "April";
    case MonthInPolish.May:
      return "May";
    case MonthInPolish.June:
      return "June";
    case MonthInPolish.July:
      return "July";
    case MonthInPolish.August:
      return "August";
    case MonthInPolish.September:
      return "September";
    case MonthInPolish.October:
      return "October";
    case MonthInPolish.November:
      return "November";
    case MonthInPolish.December:
      return "December";
  }

  throw new Error("Invalid month");
}

export function capitalizeWords(text: string): string {
  return text
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.substring(1)}`)
    .join(" ");
}
