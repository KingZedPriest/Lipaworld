import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { AWS_REGION, AWS_SQS_QUEUE_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '../config';

const sqsClient = new SQSClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

export async function publishVoucherGift(data: VoucherApiData) {
  const cmd = new SendMessageCommand({
    QueueUrl: AWS_SQS_QUEUE_URL,
    MessageBody: JSON.stringify(data)
  });

  await sqsClient.send(cmd);
}
