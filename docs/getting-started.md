# Getting started

## Installation

Add the gem to your Rails application:

```bash
bundle add missive
```

Install the migrations, then run them:

```bash
bin/rails generate missive:install
bin/rails db:migrate
```

The [installer](/reference/generators/install) creates a single migration with the `missive_*` tables.

## Configuration

### Postmark API credentials

Missive uses the same configuration as `postmark-rails`. Follow the [`postmark-rails` configuration instructions](https://github.com/ActiveCampaign/postmark-rails?tab=readme-ov-file#installation) to set up your Postmark API credentials.

### Mount the engine

Missive ships a Rails engine that receives Postmark webhooks. Mount it in `config/routes.rb`:

```rb
Rails.application.routes.draw do
  mount Missive::Engine => "/missive"
end
```

The webhook endpoint is then available at `POST /missive/postmark/webhooks`. See [Postmark webhooks](/guide/webhooks) to connect it to Postmark.

### Webhook secret

Incoming webhooks are authenticated with a shared secret, read from your Rails credentials:

```bash
bin/rails credentials:edit
```

```yaml
postmark:
  webhooks_secret: a-long-random-string
```

See [Credentials](/reference/credentials) for details.

## Quick start

Connect your `User` model:

```rb
class User < ApplicationRecord
  include Missive::User
end
```

Create a sender and a list, then subscribe a user to it:

```rb
admin = User.find_by(email: "editor@example.com")
sender = admin.init_sender(name: "The Editor")

list = Missive::List.create!(name: "My newsletter", sender:)

user = User.first
user.init_subscriber
user.missive_subscriber.subscriptions.create!(list:)
```

## Next steps

- [Connecting your User model](/guide/user-model), including how to rename the associations
- [Subscribers & subscriptions](/guide/subscriptions)
- [Senders & lists](/guide/senders-and-lists)
- [Postmark webhooks](/guide/webhooks)
