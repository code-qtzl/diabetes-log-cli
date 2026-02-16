import { plotGraph } from "../services/graphing.js";

export async function graphCommand(type: string): Promise<void> {
  await plotGraph(type);
}
