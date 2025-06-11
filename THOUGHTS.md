# THOUGHTS.md

## 1. Architecture

**Why use SQS for this workflow?**  
SQS decouples the synchronous request from the backend logic that processes the voucher. It allows the API to quickly acknowledge the client while deferring the processing (e.g., validation, persistence) to a background worker. This improves perceived performance and eliminates bottlenecks under load.

**How does async queuing help reliability and scalability?**  
Async queuing introduces natural buffering and resilience. If DynamoDB or other downstream systems are momentarily unavailable, messages can stay in the queue and be retried later. This also enables horizontal scaling — multiple consumers can pull and process messages in parallel.

**How would you handle retries and failures?**  
In the current implementation, we simulate retry handling using a try/catch inside the SQS consumer. If saving to DynamoDB fails, the message is logged and passed to a `simulateDLQ()` function. In production, I’d configure SQS with a real Dead Letter Queue (DLQ) and set redrive policies, while also logging failures to CloudWatch or a monitoring system.

---

## 2. Monitoring

**How would you monitor stuck messages, errors, and failed deliveries in production?**  
- Enable CloudWatch metrics on SQS to track `ApproximateAgeOfOldestMessage` and `NumberOfMessagesNotVisible`.
- Log all failed events with structured context (`voucherId`, recipient, error trace) into centralized logging (e.g., CloudWatch Logs or Datadog).
- Set alarms for DLQ message count, latency thresholds, and consumer failures.

---

## 3. Security

**What steps would you take to prevent API abuse or fraudulent voucher gifting?**  
- Rate limit requests per IP or user identity using Fastify middleware or API Gateway throttling.
- Validate recipient using strict patterns (`zod` + regex for email/wallet format).
- Enforce authentication + authorization on voucher sender.
- Add business rules (e.g., max vouchers/day, IP anomaly detection).
- Log all activity for auditing and alert on suspicious behavior.

---

## 4. Ownership

**Have you ever delivered a solution that significantly improved system performance or reliability? How did you measure success?**

Yes. While working on a contract-based voting platform, we needed to register users by uploading their media to S3, saving their metadata in MongoDB, and processing payments. Initially, this happened synchronously, leading to timeouts and high failure rates.

To improve reliability and performance, I introduced SQS to decouple the flow: each operation (media upload, DB save, payment trigger) became a message processed independently. By offloading tasks to background workers, system speed improved by 10x and error rates dropped to near zero. Success was measured by reduced latency, higher completion rates, and logs showing successful independent retries.