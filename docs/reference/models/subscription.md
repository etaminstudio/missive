# Subscription

The relation between a [subscriber](/reference/models/subscriber) and a [list](/reference/models/list). Unsubscribing suppresses the subscription instead of destroying it.

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `subscriber_id` | bigint | required |
| `list_id` | bigint | required |
| `suppressed_at` | timestamp | see [Suppressible](/reference/concerns/suppressible) |
| `suppression_reason` | integer | enum, see [Suppressible](/reference/concerns/suppressible) |

Unique index on `[subscriber_id, list_id]`.

## Included concerns

[Suppressible](/reference/concerns/suppressible)

## Associations

- `belongs_to :subscriber`
- `belongs_to :list, counter_cache: :subscriptions_count`

## Validations

- `list` uniqueness per subscriber ("should be subscribed once per subscriber")
