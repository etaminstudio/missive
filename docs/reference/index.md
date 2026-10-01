# Reference manual

A comprehensive list of the features and settings included in Missive. All classes live in the `Missive` namespace, and all tables are prefixed with `missive_`.

## Generators

- [Installer](/reference/generators/install): `rails g missive:install`

## Models

- [Sender](/reference/models/sender): an identity used to send messages
- [Subscriber](/reference/models/subscriber): a person receiving messages
- [Subscription](/reference/models/subscription): a subscriber's membership in a list
- [List](/reference/models/list): a newsletter, with its subscribers and messages
- [Message](/reference/models/message): an email sent to a list <Badge type="warning" text="WIP" />
- [Dispatch](/reference/models/dispatch): a message sent to one subscriber

## Concerns

- [User](/reference/concerns/user): `Missive::User`, `Missive::UserAsSender` and `Missive::UserAsSubscriber`, to include in the host app `User` model
- [Suppressible](/reference/concerns/suppressible): suppression timestamps and reasons

## Postmark

- [Webhooks endpoint](/reference/postmark/webhooks): `Missive::Postmark::WebhooksController`
- [Stamp API client](/reference/postmark/stamp): `Missive::Stamp::ApiClient`, Bulk API support <Badge type="warning" text="WIP" />

## Configuration

- [Credentials](/reference/credentials)
