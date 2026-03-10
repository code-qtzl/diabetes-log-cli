import inquirer from 'inquirer';
import chalk from 'chalk';
import { logBloodSugar, logInsulin } from '../services/logger.js';
import { showStats } from '../commands/stats.js';
import { plotGraph } from '../services/graphing.js';
import type { InsulinKind } from '../models/types.js';

export async function runMenu(): Promise<void> {
	let running = true;

	while (running) {
		console.log(chalk.bold.cyan('\n🩺 Welcome to the Diabetes Log CLI\n'));

		const { choice } = await inquirer.prompt([
			{
				type: 'select',
				name: 'choice',
				message: 'Choose an option:',
				choices: [
					{ name: '📝 Log blood sugar', value: '1' },
					{ name: '💉 Log insulin', value: '2' },
					{ name: '📊 View stats', value: '3' },
					{ name: '📈 View blood sugar graph', value: '4' },
					{ name: '📉 View insulin graph', value: '5' },
					{ name: '🚪 Exit', value: '6' },
				],
			},
		]);

		switch (choice) {
			case '1':
				await handleBloodSugarInput();
				break;
			case '2':
				await handleInsulinInput();
				break;
			case '3':
				await showStats();
				break;
			case '4':
				await plotGraph('blood_sugar');
				break;
			case '5':
				await plotGraph('insulin');
				break;
			case '6':
				console.log(chalk.green('\nGoodbye! 👋\n'));
				running = false;
				break;
		}
	}
}

async function handleBloodSugarInput(): Promise<void> {
	const answers = await inquirer.prompt([
		{
			type: 'input',
			name: 'value',
			message: 'Enter blood sugar value (mg/dL):',
			validate: (input) => {
				const value = parseFloat(input);
				if (isNaN(value) || value <= 0) {
					return 'Please enter a valid positive number.';
				}
				return true;
			},
		},
		{
			type: 'input',
			name: 'time',
			message: 'Enter time (HH:MM) or press Enter for current time:',
		},
		{
			type: 'input',
			name: 'note',
			message: 'Enter a note (optional):',
		},
	]);

	await logBloodSugar(
		parseFloat(answers.value),
		answers.time || undefined,
		answers.note,
	);
}

async function handleInsulinInput(): Promise<void> {
	const answers = await inquirer.prompt([
		{
			type: 'select',
			name: 'kind',
			message: 'Enter insulin type:',
			choices: ['bolus', 'basal'],
		},
		{
			type: 'input',
			name: 'amount',
			message: 'Enter insulin amount (units):',
			validate: (input) => {
				const value = parseFloat(input);
				if (isNaN(value) || value <= 0) {
					return 'Please enter a valid positive number.';
				}
				return true;
			},
		},
		{
			type: 'input',
			name: 'time',
			message: 'Enter time (HH:MM) or press Enter for current time:',
		},
		{
			type: 'input',
			name: 'note',
			message: 'Enter a note (optional):',
		},
	]);

	await logInsulin(
		answers.kind as InsulinKind,
		parseFloat(answers.amount),
		answers.time || undefined,
		answers.note,
	);
}
