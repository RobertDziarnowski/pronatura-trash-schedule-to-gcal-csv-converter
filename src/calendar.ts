import { TrashSchedule } from "./types";

import { ConvertedSchedule } from "./types";
import { translateMonthsToEnglish } from "./utils";

export function parseCalendar(
  yearlySchedule: TrashSchedule,
  year: string
): ConvertedSchedule {
  return yearlySchedule.flatMap((monthlySchedule) =>
    monthlySchedule.schedule.flatMap((schedule) =>
      schedule.days.flatMap((day) => ({
        type: schedule.type,
        date: new Date(
          `${translateMonthsToEnglish(monthlySchedule.month)} ${day}, ${year}`
        ),
      }))
    )
  );
}
