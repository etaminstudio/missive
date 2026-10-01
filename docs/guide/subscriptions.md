# Subscribers & subscriptions

A [`Subscriber`](/reference/models/subscriber) is identified by their email address. They can subscribe to any number of [lists](/reference/models/list) through [subscriptions](/reference/models/subscription).

## From a User

If you've [connected your User model](/guide/user-model):

```rb
user = User.first
list = Missive::List.first

# Make sure the User has an associated Missive::Subscriber:
# - if one exists with the same email, associate it
# - else create a new subscriber with the same email
user.init_subscriber

# List the subscriptions
user.missive_subscriptions # returns a `Missive::Subscription` collection

# List the lists the user has a subscription to (suppressed or not)
user.missive_subscribed_lists # returns a `Missive::List` collection

# List the lists the user has unsubscribed from
user.missive_unsubscribed_lists # returns a `Missive::List` collection

# Subscribe to an existing Missive::List
user.missive_subscriber.subscriptions.create!(list:)

# Unsubscribe from the list
user.missive_subscriptions.find_by(list:).suppress!(reason: :manual_suppression)
```

::: tip
`missive_subscribed_lists` returns every list with a subscription, including suppressed ones. To get only active subscriptions, use the `not_suppressed` scope: `user.missive_subscriptions.not_suppressed`.
:::

## Without a User

Subscribers don't need a `User`: you can manage them directly, for instance for people signing up with only an email address.

```rb
subscriber = Missive::Subscriber.find_or_create_by!(email: "jane.doe@example.com")
subscriber.subscriptions.create!(list:)
```

A subscriber can only be subscribed once to a given list.

## Suppressions

Subscribers, subscriptions and dispatches are [suppressible](/reference/concerns/suppressible): instead of being deleted, they are flagged with a `suppressed_at` timestamp and a `suppression_reason`.

| Suppressed record | Meaning |
| --- | --- |
| `Subscription` | the subscriber no longer receives messages from this list |
| `Subscriber` | the subscriber's address must not receive anything (e.g. hard bounce, spam complaint) |
| `Dispatch` | the message that triggered the suppression |

```rb
subscription.suppress!(reason: :manual_suppression)
subscription.suppressed? # => true
subscription.suppression_reason # => "manual_suppression"

subscription.unsuppress!

list.subscriptions.not_suppressed # active subscriptions
```

Suppressions reported by Postmark (bounces, spam complaints, unsubscribe links) are applied automatically by the [webhooks endpoint](/guide/webhooks).
