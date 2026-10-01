# Subscriber

A person who has opted in to receiving emails or has been added manually, optionally associated with a `User` from the host app.

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `email` | string | required |
| `user_id` | bigint | host app `User`, optional |
| `suppressed_at` | timestamp | see [Suppressible](/reference/concerns/suppressible) |
| `suppression_reason` | integer | enum, see [Suppressible](/reference/concerns/suppressible) |

## Included concerns

[Suppressible](/reference/concerns/suppressible)

## Associations

- `belongs_to :user, class_name: "::User", optional: true`
- `has_many :subscriptions, dependent: :destroy` → [Subscription](/reference/models/subscription)
- `has_many :lists, through: :subscriptions` → [List](/reference/models/list)
- `has_many :dispatches, dependent: :destroy` → [Dispatch](/reference/models/dispatch)

## Validations

- `email` presence

## Creating from a User

See [`init_subscriber`](/reference/concerns/user#init-subscriber).
