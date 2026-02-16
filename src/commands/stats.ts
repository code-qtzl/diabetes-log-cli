import Table from "cli-table3";
import chalk from "chalk";
import { readAllLogs } from "../services/dataReader.js";
import type { BloodSugarStats } from "../models/types.js";

export async function showStats(): Promise<void> {
  try {
    const logs = await readAllLogs();

    if (logs.length === 0) {
      console.log(chalk.yellow("No data found."));
      return;
    }

    const table = new Table({
      head: [
        chalk.cyan("Date"),
        chalk.cyan("Type"),
        chalk.cyan("Kind"),
        chalk.cyan("Value"),
        chalk.cyan("Time"),
        chalk.cyan("Note"),
      ],
      colWidths: [12, 15, 10, 10, 10, 30],
    });

    logs.forEach((log) => {
      table.push([
        log.date,
        log.type,
        log.kind || "",
        log.value.toString(),
        log.time,
        log.note || "",
      ]);
    });

    console.log(chalk.bold("\n🩺 Blood Sugar and Insulin Log:\n"));
    console.log(table.toString());

    const bloodSugarLogs = logs.filter((log) => log.type === "blood_sugar" && !isNaN(log.value));
    
    if (bloodSugarLogs.length > 0) {
      const stats = calculateBloodSugarStats(bloodSugarLogs);
      console.log(chalk.bold.cyan("\n📊 Blood Sugar Statistics:\n"));
      console.log(chalk.green(`Average: ${stats.average.toFixed(1)} mg/dL`));
      console.log(chalk.red(`Highest: ${stats.highest} mg/dL`));
      console.log(chalk.blue(`Lowest: ${stats.lowest} mg/dL`));
      console.log(chalk.gray(`Total readings: ${stats.count}`));
    }
  } catch (error) {
    console.error(chalk.red(`Error: ${error}`));
  }
}

function calculateBloodSugarStats(logs: any[]): BloodSugarStats {
  const values = logs.map((log) => log.value);
  const sum = values.reduce((acc, val) => acc + val, 0);
  
  return {
    average: sum / values.length,
    highest: Math.max(...values),
    lowest: Math.min(...values),
    count: values.length,
  };
}
