import { describe, it, expect } from 'vitest';

//Services
import { saveVoucherRecord } from '../src/services/dynamodb.service';

describe('DynamoDB Save', () => {
    it('should save a voucher record', async () => {
        const data = {
            recipient: 'tests@example.com',
            amount: 500,
            message: `Here's your gift!`
        }

        await saveVoucherRecord(data)
        expect(true).toBe(true)
    })
})
