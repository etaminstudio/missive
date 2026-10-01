# Stamp API client <Badge type="warning" text="WIP" />

Missive leverages Postmark's [Bulk Email API](https://postmarkapp.com/developer/api/bulk-email) endpoints. The official [postmark gem](https://github.com/ActiveCampaign/postmark-gem) does not support them yet, so Missive ships with Stamp, a thin layer over Postmark's official library.

::: info
The Bulk API is available to all Postmark customers, subject to approval. To enable it on your account, contact Postmark support. [Learn more](https://postmarkapp.com/developer/api/bulk-email#send-bulk-emails)
:::

`Missive::Stamp::ApiClient` is a subclass of `Postmark::ApiClient`: create it with your server API token, and all the methods of the official client remain available.

```rb
client = Missive::Stamp::ApiClient.new(Rails.application.credentials.postmark_api_token)
```

## `deliver_in_bulk`

Sends bulk emails from a Hash that matches the body expected by the [API](https://postmarkapp.com/developer/api/bulk-email#send-bulk-emails).

```rb
client.deliver_in_bulk(
  from: "sender@example.com",
  subject: "Hello {{name}}",
  html_body: "<p>Hello {{name}}</p>",
  text_body: "Hello {{name}}",
  messages: [
    {
      to: "jane.doe@example.com",
      template_model: {name: "Jane"}
    },
    {
      to: "john.doe@example.com",
      template_model: {name: "John"}
    }
  ]
)
```

## `deliver_message_in_bulk`

Sends bulk emails from a `Mail` instance and an Array of recipients.

```rb
mail = Mail.new do
  from "sender@example.com"
  subject "Hello {{name}}"
  body "Hello {{name}}"
end

client.deliver_message_in_bulk(
  mail,
  [
    {
      to: "jane.doe@example.com",
      template_model: {name: "Jane"}
    },
    {
      to: "john.doe@example.com",
      template_model: {name: "John"}
    }
  ]
)
```

## `get_bulk_status`

Returns the [status of a bulk API request](https://postmarkapp.com/developer/api/bulk-email#get-a-bulk-send-status), from the ID returned when sending.

```rb
client.get_bulk_status("f24af63c-533d-4b7a-ad65-4a7b3202d3a7")
```
