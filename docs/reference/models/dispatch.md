# Dispatch

The relation between a [subscriber](/reference/models/subscriber) and a [message](/reference/models/message): when a message is sent, it's dispatched to all subscribers. It's called [Email](https://postmarkapp.com/developer/api/email-api) in Postmark.

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `subscriber_id` | bigint | required |
| `message_id` | bigint | required |
| `sender_id` | bigint | required |
| `postmark_message_id` | string | ID of the email in Postmark, used to match [webhooks](/reference/postmark/webhooks) |
| `postmark_message_stream_id` | string | |
| `sent_at` | timestamp | backs `sent` |
| `delivered_at` | timestamp | backs `delivered`, set by the Delivery webhook |
| `opened_at` | timestamp | backs `opened`, set by the Open webhook |
| `clicked_at` | timestamp | backs `clicked` |
| `suppressed_at` | timestamp | see [Suppressible](/reference/concerns/suppressible) |
| `suppression_reason` | integer | enum, see [Suppressible](/reference/concerns/suppressible) |

Unique index on `[subscriber_id, message_id]`.

## Included concerns

[Suppressible](/reference/concerns/suppressible)

## Associations

- `belongs_to :subscriber` → [Subscriber](/reference/models/subscriber)
- `belongs_to :message, counter_cache: :dispatches_count` → [Message](/reference/models/message)
- `belongs_to :sender` → [Sender](/reference/models/sender)
- `has_one :list, through: :message` → [List](/reference/models/list)
- `has_one :subscription`: the subscriber's subscription to the message's list

## Validations

- `message` uniqueness per subscriber ("should be dispatched once per subscriber")

## Timestamp booleans

`sent`, `delivered`, `opened` and `clicked` are backed by their `*_at` column through [time_for_a_boolean](https://github.com/calebhearth/time_for_a_boolean), e.g. `opened?`, `opened!` (sets `opened_at` without saving) and `opened = false`.
