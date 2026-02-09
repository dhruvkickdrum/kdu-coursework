import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION })
);

const TABLE = process.env.TABLE_NAME;

// CORS headers for ACTUAL responses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*"
};

export const handler = async (event) => {

  if (event.httpMethod === "GET") {
    const data = await client.send(
      new GetCommand({
        TableName: TABLE,
        Key: { id: "counter" }
      })
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ count: data.Item?.value || 0 })
    };
  }

  if (event.httpMethod === "PUT") {
    const data = await client.send(
      new UpdateCommand({
        TableName: TABLE,
        Key: { id: "counter" },
        UpdateExpression: "ADD #v :inc",
        ExpressionAttributeNames: { "#v": "value" },
        ExpressionAttributeValues: { ":inc": 1 },
        ReturnValues: "UPDATED_NEW"
      })
    );

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ count: data.Attributes.value })
    };
  }

  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({ message: "Method Not Allowed" })
  };
};
