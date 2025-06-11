import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

//Configs
import { AWS_REGION, AWS_SQS_QUEUE_URL } from '../config';

const sqsClient = new SQSClient({ region: AWS_REGION });

//Function
export async function publishVoucherGift(data: VoucherApiData) {
    const cmd = new SendMessageCommand({
        QueueUrl: AWS_SQS_QUEUE_URL,
        MessageBody: JSON.stringify(data)
    });

    await sqsClient.send(cmd);
}
