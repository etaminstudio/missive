# Sending messages <Badge type="warning" text="WIP" />

::: warning Work in progress
Composing and sending messages is currently being developed and is not ready for use yet. This page describes what's available so far.
:::

## Creating a message

A [`Message`](/reference/models/message) belongs to a list and a sender:

```rb
message = list.messages.create!(subject: "Hello world!", sender: list.sender)
```

Message content and sending to the list's subscribers are not implemented yet. Once sent, each subscriber will get a [`Dispatch`](/reference/models/dispatch) tracking delivery, opens and clicks through [webhooks](/guide/webhooks).

## Sending in bulk

In the meantime, the low-level [Stamp API client](/reference/postmark/stamp) can already send emails through Postmark's [Bulk Email API](https://postmarkapp.com/developer/api/bulk-email):

```rb
client = Missive::Stamp::ApiClient.new(Rails.application.credentials.postmark_api_token)

client.deliver_in_bulk(
  from: "sender@example.com",
  subject: "Hello {{name}}",
  html_body: "<p>Hello {{name}}</p>",
  text_body: "Hello {{name}}",
  messages: [
    {to: "jane.doe@example.com", template_model: {name: "Jane"}},
    {to: "john.doe@example.com", template_model: {name: "John"}}
  ]
)
```
