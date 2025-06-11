import { SQSEvent } from 'aws-lambda';

//Services
import { saveVoucherRecord } from '../services/dynamodb.service';


export async function handler(event: SQSEvent) {
    for (const record of event.Records) {
        const data: VoucherApiData = JSON.parse(record.body)
        try {
            console.log('Simulating voucher gift:', data)
            await saveVoucherRecord(data)
        } catch (err) {
            console.error('ERROR saving voucher, sending to DLQ:', err)
            await simulateDLQ(data)
        }
    }
}

async function simulateDLQ(data: VoucherApiData) {
    // Log DLQ behavior
    console.warn('Dead-letter queue simulated:', data)
    // You can write to a file, log, or a fallback table
}
