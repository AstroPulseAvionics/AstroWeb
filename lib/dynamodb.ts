import "server-only";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const region = process.env.AWS_REGION;
const partsTable = process.env.DDB_PARTS_TABLE;
const sponsorsTable = process.env.DDB_SPONSORS_TABLE;
const individualsTable = process.env.DDB_INDIVIDUALS_TABLE;
const eventsTable = process.env.DDB_EVENTS_TABLE;

if (!region) {
  throw new Error("AWS_REGION is not set.");
}

  if (!partsTable || !sponsorsTable || !individualsTable || !eventsTable) {
    throw new Error("DynamoDB table env vars are not set.");
  }

const client = new DynamoDBClient({ region });
const docClient = DynamoDBDocumentClient.from(client);

export type PartRecord = {
  name: string;
  price: string;
  description: string;
  funded?: number;
  image?: string;
  order?: number;
};

export type SponsorRecord = {
  name: string;
  logo: string;
  url?: string;
  whiteBackground?: boolean;
  logoPadding?: number;
  order?: number;
};

export type IndividualRecord = {
  name: string;
  order?: number;
};

export async function getParts() {
  const data = await docClient.send(
    new ScanCommand({
      TableName: partsTable,
    })
  );
  const items = (data.Items ?? []) as PartRecord[];

  return items.sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
    const orderB = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
}

export async function getSponsors() {
  const data = await docClient.send(
    new ScanCommand({
      TableName: sponsorsTable,
    })
  );
  const items = (data.Items ?? []) as SponsorRecord[];

  return items.sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
    const orderB = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
}

export async function getIndividuals() {
  const data = await docClient.send(
    new ScanCommand({
      TableName: individualsTable,
    })
  );
  const items = (data.Items ?? []) as IndividualRecord[];

  return items.sort((a, b) => {
    const orderA = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
    const orderB = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });
}

export async function updatePartFunding(partName: string, amount: number) {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error("Invalid funding amount.");
  }

  const result = await docClient.send(
    new UpdateCommand({
      TableName: partsTable,
      Key: { name: partName },
      UpdateExpression: "SET funded = if_not_exists(funded, :zero) + :amount",
      ExpressionAttributeValues: {
        ":zero": 0,
        ":amount": amount,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes as PartRecord | undefined;
}

export async function recordWebhookEvent(eventId: string) {
  const docClient = getDocClient();
  if (!eventsTable) {
    throw new Error("DDB_EVENTS_TABLE is not set.");
  }

  try {
    await docClient.send(
      new PutCommand({
        TableName: eventsTable,
        Item: {
          id: eventId,
          createdAt: new Date().toISOString(),
        },
        ConditionExpression: "attribute_not_exists(id)",
      })
    );
    return true;
  } catch (error) {
    return false;
  }
}
