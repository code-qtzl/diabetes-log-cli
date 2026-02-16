#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { bloodSugarCommand } from "./commands/bloodSugar.js";
import { insulinCommand } from "./commands/insulin.js";
import { showStats } from "./commands/stats.js";
import { graphCommand } from "./commands/graph.js";
import { runMenu } from "./utils/menu.js";
import type { InsulinKind } from "./models/types.js";

const program = new Command();

program
  .name("diabetes-tracker")
  .description(chalk.cyan("🩺 A CLI tool to log and visualize blood sugar and insulin data"))
  .version("1.0.0");

program
  .command("blood-sugar")
  .description("Log a blood sugar value")
  .requiredOption("-v, --value <number>", "Blood sugar value (mg/dL)")
  .option("-t, --time <HH:MM>", "Time of reading")
  .option("-n, --note <text>", "Optional note")
  .action(async (options) => {
    await bloodSugarCommand(
      parseFloat(options.value),
      options.time,
      options.note
    );
  });

program
  .command("insulin")
  .description("Log an insulin dose")
  .requiredOption("-k, --kind <bolus|basal>", "Insulin type (bolus or basal)")
  .requiredOption("-a, --amount <number>", "Insulin amount (units)")
  .option("-t, --time <HH:MM>", "Time of dose")
  .option("-n, --note <text>", "Optional note")
  .action(async (options) => {
    await insulinCommand(
      options.kind as InsulinKind,
      parseFloat(options.amount),
      options.time,
      options.note
    );
  });

program
  .command("stats")
  .description("Show all logged data and statistics")
  .action(async () => {
    await showStats();
  });

program
  .command("graph")
  .description("Show a graph for blood sugar or insulin data")
  .requiredOption("-t, --type <blood_sugar|insulin>", "Type of data to graph")
  .action(async (options) => {
    await graphCommand(options.type);
  });

if (process.argv.length === 2) {
  runMenu().catch(console.error);
} else {
  program.parse(process.argv);
}
