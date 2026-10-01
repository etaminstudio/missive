# List

A list of subscribers, i.e. a newsletter. It uses a specific [Message Stream](https://postmarkapp.com/developer/api/message-streams-api) to send messages through Postmark.

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `name` | string | required |
| `sender_id` | bigint | default [sender](/reference/models/sender), required |
| `postmark_message_stream_id` | string | Postmark Message Stream used to send messages |
| `subscriptions_count` | integer | counter cache, default `0` |
| `messages_count` | integer | counter cache, default `0` |
| `last_message_sent_at` | timestamp | |

## Associations

- `belongs_to :sender` → [Sender](/reference/models/sender)
- `has_many :subscriptions, dependent: :destroy` → [Subscription](/reference/models/subscription)
- `has_many :subscribers, through: :subscriptions` → [Subscriber](/reference/models/subscriber)
- `has_many :messages, dependent: :destroy` → [Message](/reference/models/message)

## Validations

- `name` presence
- `sender` presence (required `belongs_to`)

::: tip
`subscriptions_count` and `subscribers` include suppressed subscriptions. Use `list.subscriptions.not_suppressed` for active ones.
:::
