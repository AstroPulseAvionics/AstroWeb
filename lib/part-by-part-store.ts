import "server-only";
import { promises as fs } from "fs";
import path from "path";

const partsPath = path.join(process.cwd(), "lib", "part-by-part.json");

type PartEntry = {
  name: string;
  price: string;
  description: string;
  funded?: number;
  image?: string;
};

export async function updatePartFunding(partName: string, amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid funding amount.");
  }

  const raw = await fs.readFile(partsPath, "utf-8");
  const parts = JSON.parse(raw) as PartEntry[];
  const target = parts.find((part) => part.name === partName);

  if (!target) {
    throw new Error(`Part not found: ${partName}`);
  }

  const fundedValue = typeof target.funded === "number" ? target.funded : 0;
  target.funded = fundedValue + amount;

  await fs.writeFile(partsPath, JSON.stringify(parts, null, 2) + "\n");

  return target;
}
