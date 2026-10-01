# What's Missive?

Missive is a lightweight Rails toolkit for building newsletter features. It provides the primitives for managing newsletters and subscribers, with [Postmark](https://postmarkapp.com/) handling delivery.

## Features

- **Newsletter management**: create and organize newsletters within your Rails application
- **Postmark integration**: rely on Postmark's email delivery service, its webhooks and its Bulk API
- **Rails native**: designed to work seamlessly with Rails conventions and Active Record
- **Subscriber management**: handle your newsletter subscriber lists, including suppressions

## Scope

### Goals

- Rely on Postmark as much as possible, integrate with webhooks, send through the Postmark API (not SMTP).
- Provide a way to compose messages that include content from the host app models.

### Non-goals

- Integrate with other sending services.
- Send transactional emails or email sequences: Missive focuses on newsletters.
- Provide ready-made subscription forms: subscription management is the responsibility of the host app.
- Multi-tenancy: Missive is designed for a single Rails app and domain.

## Concepts

- [`Sender`](/reference/models/sender) is an identity used to send messages, optionally associated with a `User` from the host app. It has a corresponding [Sender Signature](https://postmarkapp.com/developer/api/signatures-api) in Postmark.
- [`Subscriber`](/reference/models/subscriber) is a person who has opted in to receiving emails or has been added manually, optionally associated with a `User` from the host app.
- [`Subscription`](/reference/models/subscription) is the relation between a subscriber and a list.
- [`List`](/reference/models/list) is a list of subscribers. It uses a specific [Message Stream](https://postmarkapp.com/developer/api/message-streams-api) to send messages through Postmark.
- [`Message`](/reference/models/message) is an email sent to subscribers of a given list.
- [`Dispatch`](/reference/models/dispatch) is the relation between a subscriber and a message (ie. when a `Message` is sent, it's dispatched to all subscribers). It's called [Email](https://postmarkapp.com/developer/api/email-api) in Postmark.

## Requirements

- Rails 8.0 or higher
- A Postmark account with API credentials

### Dependencies

- Official [postmark](https://github.com/activecampaign/postmark-gem) gem
- [time_for_a_boolean](https://github.com/calebhearth/time_for_a_boolean) to back boolean concepts (`sent`, `delivered`, `opened`, ...) with timestamps
- [rails-pattern_matching](https://github.com/kddnewton/rails-pattern_matching) to use pattern matching when processing incoming webhooks

## Status

Missive is in early development (`0.0.x`). Subscriber, sender and list management, as well as webhook processing, are usable today. Composing and sending messages is still being built: pages covering it are flagged <Badge type="warning" text="WIP" />.
