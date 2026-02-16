import * as asciichart from "asciichart";
import chalk from "chalk";
import { format, parseISO } from "date-fns";
import { getLogsByType } from "./dataReader.js";

export async function plotGraph(dataType: string): Promise<void> {
  try {
    const logs = await getLogsByType(dataType);

    if (logs.length === 0) {
      console.log(chalk.yellow(`No ${dataType.replace("_", " ")} data to plot.`));
      return;
    }

    const values = logs.map((log) => log.value);
    const timestamps = logs.map((log) => {
      try {
        const dateTime = parseISO(`${log.date}T${log.time}`);
        return format(dateTime, "MM/dd HH:mm");
      } catch {
        return `${log.date} ${log.time}`;
      }
    });

    const config = {
      height: 15,
      offset: 3,
      padding: "       ",
      colors: [asciichart.blue],
    };

    console.log(
      chalk.bold.cyan(`\n📊 ${dataType.replace("_", " ").toUpperCase()} Over Time\n`)
    );
    console.log(asciichart.plot(values, config));
    console.log(chalk.gray("\nValue (mg/dL for blood sugar, units for insulin)\n"));

    if (timestamps.length > 0) {
      console.log(chalk.gray(`Time range: ${timestamps[0]} to ${timestamps[timestamps.length - 1]}`));
    }
  } catch (error) {
    console.error(chalk.red(`Error plotting graph: ${error}`));
  }
}
