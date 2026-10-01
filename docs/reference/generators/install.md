# Installer

```bash
bin/rails generate missive:install
```

Copies a single `db/migrate/<timestamp>_install_missive.rb` migration into your application. Run `bin/rails db:migrate` afterwards.

## Tables

| Table | Model |
| --- | --- |
| `missive_senders` | [Sender](/reference/models/sender) |
| `missive_subscribers` | [Subscriber](/reference/models/subscriber) |
| `missive_subscriptions` | [Subscription](/reference/models/subscription) |
| `missive_lists` | [List](/reference/models/list) |
| `missive_messages` | [Message](/reference/models/message) |
| `missive_dispatches` | [Dispatch](/reference/models/dispatch) |

`missive_subscribers.user_id` has a foreign key to your `users` table, so the `users` table must exist before you run the migration. `missive_senders.user_id` has no foreign key constraint.
