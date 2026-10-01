# Suppressible

`Missive::Suppressible` flags a record as suppressed instead of deleting it, keeping a history of bounces, complaints and unsubscriptions. It's included in [Subscriber](/reference/models/subscriber), [Subscription](/reference/models/subscription) and [Dispatch](/reference/models/dispatch).

## Columns

| Column | Type | Notes |
| --- | --- | --- |
| `suppressed_at` | timestamp | backs the `suppressed` boolean |
| `suppression_reason` | integer | enum, required when suppressed |

## Suppression reasons

The `suppression_reason` enum matches [Postmark's suppression reasons](https://postmarkapp.com/developer/api/suppressions-api):

| Value | Postmark reason |
| --- | --- |
| `hard_bounce` | `HardBounce` |
| `spam_complaint` | `SpamComplaint` |
| `manual_suppression` | `ManualSuppression` (e.g. the recipient used an unsubscribe link) |

## Scopes

- `suppressed`: records with a `suppressed_at`
- `not_suppressed`: records without one

## Methods

| Method | Effect |
| --- | --- |
| `suppress!(reason:)` | sets `suppressed_at` to now and `suppression_reason`, then saves |
| `unsuppress!` | clears `suppressed_at` and `suppression_reason` |
| `suppressed?` | `true` when `suppressed_at` is set and in the past |

The enum also generates the usual predicates and scopes, such as `hard_bounce?` and `Missive::Subscriber.spam_complaint`.
