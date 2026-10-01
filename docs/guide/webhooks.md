# Postmark webhooks

Missive keeps its records in sync with Postmark through [webhooks](https://postmarkapp.com/developer/webhooks/webhooks-overview): deliveries, opens and subscription changes are recorded on the matching [dispatch](/reference/models/dispatch), [subscriber](/reference/models/subscriber) and [subscription](/reference/models/subscription).

## Setup

1. [Mount the engine](/getting-started#mount-the-engine), e.g. at `/missive`.
2. Add a `postmark.webhooks_secret` to your [credentials](/reference/credentials).
3. In Postmark, open the Message Stream used by your list, go to **Webhooks** and add a webhook:
   - **URL**: `https://your-app.example/missive/postmark/webhooks`
   - **Custom header**: `X-Postmark-Secret` with the value of your `webhooks_secret`
   - **Events**: Delivery, Open and Subscription Change

## What gets recorded

| Postmark event | Effect |
| --- | --- |
| Delivery | sets the dispatch's `delivered_at` |
| Open | sets the dispatch's `opened_at` |
| Subscription change (suppressed) | suppresses the subscriber, and the dispatch and subscription when they can be found, with the reason given by Postmark (`hard_bounce`, `spam_complaint` or `manual_suppression`) |
| Subscription change (reactivated) | unsuppresses the subscriber, dispatch and subscription |

Dispatches are matched by their `postmark_message_id`, and subscribers by the recipient email address.

See the [webhooks endpoint reference](/reference/postmark/webhooks) for the full list of responses.
