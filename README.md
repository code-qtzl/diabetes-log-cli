# Diabetes Tracker CLI (TypeScript)

A command-line tool to log and visualize blood sugar and insulin data, built with TypeScript.

## Features

- Log blood sugar values with optional notes
- Log insulin doses (bolus/basal) with optional notes
- View all logs in a formatted table
- View statistics (average, highest, lowest blood sugar)
- Plot blood sugar or insulin data as ASCII graphs directly in the terminal
- Beautiful, colorized output
- Interactive menu mode
- Command-line argument mode

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. **Clone and navigate to the project:**

    ```bash
    cd diabetes-log-cli
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Build the project:**

    ```bash
    npm run build
    ```

4. **Link globally (optional):**
    ```bash
    npm link
    ```

## Usage

### Interactive Menu Mode

Run without arguments to start the interactive menu:

```bash
npm run dev
# or if linked globally:
diabetes-tracker
```

Navigate using arrow keys and follow the prompts.

### Command Line Mode

#### Log Blood Sugar

```bash
npm run dev blood-sugar -- --value 120 --time 08:30 --note "Fasting"
# or if linked globally:
diabetes-tracker blood-sugar --value 120 --time 08:30 --note "Fasting"
```

#### Log Insulin

```bash
npm run dev insulin -- --kind bolus --amount 5 --time 12:00 --note "Lunch"
# or if linked globally:
diabetes-tracker insulin --kind bolus --amount 5 --time 12:00 --note "Lunch"
```

#### View Statistics

```bash
npm run dev stats
# or if linked globally:
diabetes-tracker stats
```

#### View Graph

```bash
npm run dev graph -- --type blood_sugar
npm run dev graph -- --type insulin
# or if linked globally:
diabetes-tracker graph --type blood_sugar
diabetes-tracker graph --type insulin
```

## Development

### Scripts

- **`npm run dev`** - Run in development mode with tsx (no build required)
- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm run watch`** - Watch mode for automatic recompilation
- **`npm start`** - Run the compiled version

### Project Structure

```
diabetes-log-cli/
├── src/
│   ├── index.ts              # Entry point and CLI setup
│   ├── commands/
│   │   ├── bloodSugar.ts     # Blood sugar command
│   │   ├── insulin.ts        # Insulin command
│   │   ├── stats.ts          # Statistics command
│   │   └── graph.ts          # Graph command
│   ├── services/
│   │   ├── logger.ts         # CSV logging service
│   │   ├── dataReader.ts     # CSV reading service
│   │   └── graphing.ts       # ASCII chart service
│   ├── models/
│   │   └── types.ts          # TypeScript interfaces
│   └── utils/
│       └── menu.ts           # Interactive menu
├── storage.csv               # Data file (created on first use)
├── package.json
├── tsconfig.json
└── README.md
```

## Data Storage

All logs are saved in `storage.csv` in the project root directory.

## Technology Stack

- **TypeScript** - Type-safe JavaScript
- **Commander.js** - CLI framework
- **asciichart** - Terminal-based ASCII charts
- **cli-table3** - Beautiful ASCII tables
- **inquirer** - Interactive command-line prompts
- **csv-parser & csv-writer** - CSV file handling
- **date-fns** - Date/time utilities
- **chalk** - Terminal string styling

## Example Output

### Interactive Menu

```
Welcome to the Diabetes Tracker CLI

? Choose an option: (Use arrow keys)
> Log blood sugar
  Log insulin
  View stats
  View blood sugar graph
  View insulin graph
  Exit
```

### ASCII Graph

```
BLOOD SUGAR Over Time

  180.00 ┤                                    ╭╮
  170.00 ┤                              ╭─────╯╰╮
  160.00 ┤                         ╭────╯       │
  150.00 ┤                    ╭────╯            │
  140.00 ┤               ╭────╯                 │
  130.00 ┤          ╭────╯                      ╰╮
  120.00 ┤     ╭────╯                            │
  110.00 ┤╭────╯                                 ╰─
  100.00 ┼╯

Value (mg/dL for blood sugar, units for insulin)
```

### Statistics Table

```
Blood Sugar and Insulin Log:

| Date       | Type        | Kind  | Value | Time  | Note     |
|------------|-------------|-------|-------|-------|----------|
| 2026-02-16 | blood_sugar |       | 120   | 08:30 | Fasting  |
| 2026-02-16 | insulin     | bolus | 5     | 12:00 | Lunch    |

Blood Sugar Statistics:

Average: 125.5 mg/dL
Highest: 180 mg/dL
Lowest: 95 mg/dL
Total readings: 15
```

### The following is my submission for the GitHub Copilot CLI Challenge.

## License

MIT
