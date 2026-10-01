# Webhooks endpoint

`Missive::Postmark::WebhooksController` receives [Postmark webhooks](https://postmarkapp.com/developer/webhooks/webhooks-overview). See the [guide](/guide/webhooks) to configure them in Postmark.

## Route

```
POST <engine mount path>/postmark/webhooks
```

e.g. `POST /missive/postmark/webhooks` with `mount Missive::Engine => "/missive"`. CSRF protection is skipped for this endpoint.

## Authentication

Every request must have an `X-Postmark-Secret` header equal to `Rails.application.credentials.postmark.webhooks_secret`. Otherwise, the endpoint responds `401 Unauthorized`.

## Supported payloads

| `RecordType` | Matching fields | Effect |
| --- | --- | --- |
| `Delivery` | `DeliveredAt` | sets `delivered_at` on the dispatch |
| `Open` | `ReceivedAt` | sets `opened_at` on the dispatch |
| `SubscriptionChange` | `SuppressSending: true`, `SuppressionReason` | `suppress!` the subscriber, and the dispatch and subscription if found |
| `SubscriptionChange` | `SuppressSending: false` | `unsuppress!` the subscriber, and the dispatch and subscription if found |

Records are matched as follows:

- the [subscriber](/reference/models/subscriber) by `Recipient` (email)
- the [dispatch](/reference/models/dispatch) by `MessageID` (`postmark_message_id`)
- the [subscription](/reference/models/subscription) by the dispatch's list and the subscriber

For `Delivery` and `Open`, the subscriber and the dispatch must exist, and the dispatch must belong to that subscriber. For `SubscriptionChange`, only the subscriber is required.

## Responses

| Status | Body | When |
| --- | --- | --- |
| `200 OK` | | payload processed |
| `400 Bad Request` | `Dispatch subscriber … does not match payload recipient …` | the dispatch belongs to another subscriber |
| `401 Unauthorized` | `Cannot verify webhook` | missing or wrong secret |
| `404 Not Found` | `Missive::Subscriber not found` / `Missive::Dispatch not found` | no matching record |
| `422 Unprocessable Entity` | `Webhook payload not supported` | unsupported `RecordType` or fields |
