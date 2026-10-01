# Message <Badge type="warning" text="WIP" />

An email sent to the subscribers of a given [list](/reference/models/list).

::: warning Work in progress
Message content and sending are not implemented yet. See [Sending messages](/guide/sending-messages).
:::

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `subject` | string | required |
| `list_id` | bigint | required |
| `sender_id` | bigint | required |
| `postmark_message_stream_id` | string | |
| `dispatches_count` | integer | counter cache, default `0` |
| `sent_at` | timestamp | backs the `sent` boolean |

## Associations

- `belongs_to :list, counter_cache: :messages_count` → [List](/reference/models/list)
- `belongs_to :sender` → [Sender](/reference/models/sender)
- `has_many :dispatches, dependent: :destroy` → [Dispatch](/reference/models/dispatch)

## Validations

- `subject` presence

## Timestamp booleans

`sent` is backed by `sent_at` through [time_for_a_boolean](https://github.com/calebhearth/time_for_a_boolean):

| Method | Effect |
| --- | --- |
| `sent?` / `sent` | `true` when `sent_at` is set and in the past |
| `sent!` | sets `sent_at` to the current time (doesn't save) |
| `sent = false` | clears `sent_at` |
