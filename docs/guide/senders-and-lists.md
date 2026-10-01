# Senders & lists

## Senders

A [`Sender`](/reference/models/sender) is the identity messages are sent from. It mirrors a [Sender Signature](https://postmarkapp.com/developer/api/signatures-api) in Postmark: make sure the email address (or its domain) is verified there.

If you've [connected your User model](/guide/user-model):

```rb
user = User.where(admin: true).first

# Make sure the User has an associated Missive::Sender:
# - if one exists with the same email, associate it
# - else create a new sender with the same email
# then assign them the provided name
user.init_sender(name: user.full_name)

# Lists and messages sent by this user
user.missive_sent_lists
user.missive_sent_messages
```

Or without a `User`:

```rb
sender = Missive::Sender.create!(
  email: "newsletter@example.com",
  name: "Example Newsletter",
  reply_to_email: "hello@example.com"
)
```

A sender that still has lists, messages or dispatches can't be destroyed.

## Lists

Every [`List`](/reference/models/list) has a default sender.

```rb
# Create a new list
list = Missive::List.create!(name: "My newsletter", sender: user.missive_sender)

# Choose a specific Message Stream to send messages for this list
list.update!(postmark_message_stream_id: "bulk")

# Change the default sender of a list
list.update!(sender: another_user.missive_sender)

# Get available lists
Missive::List.all

# Get list stats
list.subscriptions_count # how many people subscribe or unsubscribe to this list?
list.messages_count # how many messages have been created in this list?
```

::: warning
`user.missive_sent_lists` is a read-only association (it goes through `missive_sender`): assign the list's `sender` instead of appending lists to it.
:::

### Message Streams

Postmark requires [broadcast messages](https://postmarkapp.com/message-streams) to be sent through a dedicated Broadcast Message Stream. Create one in Postmark for your newsletters, then set its ID as the list's `postmark_message_stream_id`.
