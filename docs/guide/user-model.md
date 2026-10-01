# Connecting your User model

Connecting the host app `User` model is optional, but convenient: a user can be associated to a [`Missive::Subscriber`](/reference/models/subscriber) and/or a [`Missive::Sender`](/reference/models/sender) using the [`Missive::User`](/reference/concerns/user) concern.

```rb
class User < ApplicationRecord
  include Missive::User
end
```

::: info
Missive matches users with senders and subscribers by email, so your `User` model needs an `email` attribute.
:::

## Sender or subscriber only

The concerns can also be included separately, which is useful if `User` needs to be implemented as a `Sender` or `Subscriber` only.

```rb
class User < ApplicationRecord
  include Missive::UserAsSender
  include Missive::UserAsSubscriber
end
```

This is equivalent to:

```rb
class User < ApplicationRecord
  # Missive::UserAsSender
  has_one :missive_sender # ...
  has_many :missive_sent_dispatches # ...
  has_many :missive_sent_lists # ...
  has_many :missive_sent_messages # ...

  def init_sender(attributes = {})
    # ...
  end

  # Missive::UserAsSubscriber
  has_one :missive_subscriber # ...
  has_many :missive_dispatches # ...
  has_many :missive_subscriptions # ...
  has_many :missive_subscribed_lists # ...
  has_many :missive_unsubscribed_lists # ...

  def init_subscriber(attributes = {})
    # ...
  end
end
```

## Customizing association names

By default, association names are prefixed with `missive_` to avoid collisions with existing associations. If you want to use shorter names (e.g., `sender` instead of `missive_sender`), you can customize them using the `.with` method:

```rb
class User < ApplicationRecord
  include Missive::User.with(
    sender: {
      sender: :sender,
      sent_dispatches: :sent_dispatches,
      sent_lists: :sent_lists,
      sent_messages: :sent_messages
    },
    subscriber: {
      subscriber: :subscriber,
      dispatches: :dispatches,
      subscriptions: :subscriptions,
      subscribed_lists: :subscribed_lists,
      unsubscribed_lists: :unsubscribed_lists
    }
  )
end
```

Or, if including the concerns separately:

```rb
class User < ApplicationRecord
  include Missive::UserAsSender.with(
    sender: :sender,
    sent_dispatches: :sent_dispatches,
    sent_lists: :sent_lists,
    sent_messages: :sent_messages
  )

  include Missive::UserAsSubscriber.with(
    subscriber: :subscriber,
    dispatches: :dispatches,
    subscriptions: :subscriptions,
    subscribed_lists: :subscribed_lists,
    unsubscribed_lists: :unsubscribed_lists
  )
end
```

You only need to customize the associations you want to rename. Any unconfigured associations will use their default `missive_` prefixed names.

## Collision checks

If your model already defines an association with the same name as the main `sender` or `subscriber` association, Missive raises an error when the class is loaded instead of silently overriding it:

```
Missive::UserAsSender::AssociationAlreadyDefinedError:
  Association :missive_sender is already defined on User.
  Use Missive::UserAsSender.with to specify a different name.
```

Pick another name with `.with` to resolve it.
