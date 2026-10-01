# Missive

A lightweight Rails toolkit for building newsletter features. Missive provides the primitives for managing newsletters and subscribers, with [Postmark](https://postmarkapp.com/) handling delivery.

📖 **Documentation: [missive.etamin.studio](https://missive.etamin.studio)**

## Features

- **Newsletter management**: create and organize newsletters within your Rails application
- **Postmark integration**: send through the Postmark API, track deliveries, opens and suppressions with webhooks
- **Rails native**: a mountable engine with plain Active Record models
- **Subscriber management**: handle your newsletter subscriber lists, optionally connected to your `User` model

Missive is in early development: composing and sending messages is still being built. See [What's Missive?](https://missive.etamin.studio/what-is-missive) for its goals and non-goals.

## Requirements

- Rails 8.0 or higher
- A Postmark account with API credentials

## Installation

```bash
bundle add missive
bin/rails generate missive:install
bin/rails db:migrate
```

Mount the engine to receive Postmark webhooks:

```rb
# config/routes.rb
mount Missive::Engine => "/missive"
```

Then configure your [credentials](https://missive.etamin.studio/reference/credentials) and [webhooks](https://missive.etamin.studio/guide/webhooks). See [Getting started](https://missive.etamin.studio/getting-started) for the full setup.

## Quick start

```rb
class User < ApplicationRecord
  include Missive::User
end

sender = User.find_by(email: "editor@example.com").init_sender(name: "The Editor")
list = Missive::List.create!(name: "My newsletter", sender:)

user = User.first
user.init_subscriber
user.missive_subscriber.subscriptions.create!(list:)
```

Read the [guides](https://missive.etamin.studio/guide/user-model) and the [reference manual](https://missive.etamin.studio/reference/) for more.

## Documentation

The documentation site lives in [`docs/`](docs) and is built with [VitePress](https://vitepress.dev):

```bash
npm install
npm run docs:dev
```

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the Missive project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/etaminstudio/missive/blob/main/CODE_OF_CONDUCT.md).
