# User

Concerns to include in the host app `User` model, associating it to a [Sender](/reference/models/sender) and/or a [Subscriber](/reference/models/subscriber). See the [guide](/guide/user-model) for usage.

| Concern | Includes |
| --- | --- |
| `Missive::User` | both concerns below |
| `Missive::UserAsSender` | sender associations and `init_sender` |
| `Missive::UserAsSubscriber` | subscriber associations and `init_subscriber` |

The model must have an `email` attribute.

## Missive::UserAsSender

### Associations

| Key | Default name | Definition |
| --- | --- | --- |
| `sender` | `missive_sender` | `has_one` [Sender](/reference/models/sender), `dependent: :nullify` |
| `sent_dispatches` | `missive_sent_dispatches` | `has_many` [Dispatch](/reference/models/dispatch) through the sender |
| `sent_lists` | `missive_sent_lists` | `has_many` [List](/reference/models/list) through the sender |
| `sent_messages` | `missive_sent_messages` | `has_many` [Message](/reference/models/message) through the sender |

### `init_sender`

```rb
user.init_sender(attributes = {}) # => Missive::Sender
```

Finds the sender with the user's email, or initializes a new one, associates it to the user, assigns `attributes` (e.g. `name:`) and saves it.

## Missive::UserAsSubscriber

### Associations

| Key | Default name | Definition |
| --- | --- | --- |
| `subscriber` | `missive_subscriber` | `has_one` [Subscriber](/reference/models/subscriber), `dependent: :destroy` |
| `dispatches` | `missive_dispatches` | `has_many` [Dispatch](/reference/models/dispatch) through the subscriber |
| `subscriptions` | `missive_subscriptions` | `has_many` [Subscription](/reference/models/subscription) through the subscriber |
| `subscribed_lists` | `missive_subscribed_lists` | `has_many` [List](/reference/models/list) through the subscriptions, including suppressed ones |
| `unsubscribed_lists` | `missive_unsubscribed_lists` | `has_many` [List](/reference/models/list) through suppressed subscriptions |

### `init_subscriber`

```rb
user.init_subscriber(attributes = {}) # => Missive::Subscriber
```

Finds the subscriber with the user's email, or initializes a new one, associates it to the user, assigns `attributes` and saves it.

## Renaming associations: `.with`

Each concern accepts a hash mapping the keys above to custom association names. Unconfigured keys keep their default name.

```rb
include Missive::UserAsSender.with(sender: :sender, sent_lists: :lists)
include Missive::UserAsSubscriber.with(subscriber: :subscriber)

# or both at once
include Missive::User.with(
  sender: {sender: :sender},
  subscriber: {subscriber: :subscriber}
)
```

`init_sender` and `init_subscriber` use the configured names. The configuration is exposed as `User.missive_sender_config` and `User.missive_subscriber_config`.

## Errors

`Missive::UserAsSender::AssociationAlreadyDefinedError` / `Missive::UserAsSubscriber::AssociationAlreadyDefinedError` is raised when the model already defines an association with the name chosen for `sender` / `subscriber`.
