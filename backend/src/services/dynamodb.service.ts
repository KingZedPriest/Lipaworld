import { DynamoDBClient, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

//Configs
import { AWS_REGION, AWS_DYNAMO_TABLE_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config';

const db = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
})

const TABLE_NAME = AWS_DYNAMO_TABLE_NAME

//Save Record to Database
export async function saveVoucherRecord(data: VoucherApiData) {

  const now = new Date().toISOString();

  const item = {
    voucherId: { S: uuidv4() },
    createdAt: { S: now },
    recipient: { S: data.recipient },
    amount: { N: data.amount.toString() },
    message: { S: data.message || '' }
  }

  const cmd = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: item
  })

  await db.send(cmd)
}

//Get a Recipient Vouchers
export async function getVouchersByRecipient(recipient: string) {

  const result = await db.send(new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: 'recipient = :r',
    ExpressionAttributeValues: { ':r': { S: recipient } }
  }))

  return result.Items?.map(item => ({
    voucherId: item.voucherId.S,
    createdAt: item.createdAt.S,
    recipient: item.recipient.S,
    amount: parseFloat(item.amount.N || "0"),
    message: item.message.S
  })) || []
}
