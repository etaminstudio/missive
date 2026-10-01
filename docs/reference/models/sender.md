# Sender

An identity used to send messages, optionally associated with a `User` from the host app. It has a corresponding [Sender Signature](https://postmarkapp.com/developer/api/signatures-api) in Postmark.

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `email` | string | required |
| `name` | string | display name |
| `reply_to_email` | string | |
| `postmark_sender_signature_id` | integer | ID of the Sender Signature in Postmark |
| `user_id` | bigint | host app `User`, optional, no foreign key constraint |

## Associations

- `belongs_to :user, class_name: "::User", optional: true`
- `has_many :lists`: [lists](/reference/models/list) this sender is the default sender of
- `has_many :messages` → [Message](/reference/models/message)
- `has_many :dispatches` → [Dispatch](/reference/models/dispatch)

All three `has_many` use `dependent: :restrict_with_exception`: a sender with lists, messages or dispatches can't be destroyed.

## Validations

- `email` presence

## Creating from a User

See [`init_sender`](/reference/concerns/user#init-sender).
