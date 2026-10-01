# Credentials

## Postmark API token

Missive uses the same configuration as `postmark-rails`. Follow the [`postmark-rails` configuration instructions](https://github.com/ActiveCampaign/postmark-rails?tab=readme-ov-file#installation) to set up your Postmark API credentials, e.g.:

```yaml
postmark_api_token: your-server-api-token
```

## Webhook secret

The [webhooks endpoint](/reference/postmark/webhooks) reads its shared secret from `Rails.application.credentials.postmark.webhooks_secret`:

```yaml
postmark:
  webhooks_secret: a-long-random-string
```

Generate one with `bin/rails secret`, and set the same value in the `X-Postmark-Secret` custom header of your Postmark webhooks.

::: danger
Always set `postmark.webhooks_secret` in every environment where the engine is mounted.
:::
