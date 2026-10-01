---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Missive"
  text: "First-class mail"
  tagline: "A lightweight toolkit for managing newsletters in Rails, sending them with Postmark"
  image:
    src: /logo.svg
    alt: Missive
  actions:
    - theme: brand
      text: What's Missive?
      link: /what-is-missive
    - theme: alt
      text: Getting started
      link: /getting-started

features:
  - icon: 📮
    title: Postmark-native
    details: Sends through the Postmark API rather than SMTP, maps lists to Message Streams and senders to Sender Signatures.
  - icon: 🛤
    title: Rails-native
    details: A mountable engine with plain Active Record models and a single install generator. It follows Rails conventions throughout.
  - icon: 👥
    title: Subscribers & lists
    details: Senders, subscribers, lists and subscriptions, which you can attach to your own User model with one concern.
  - icon: 📬
    title: Webhook-driven tracking
    details: Postmark webhooks record deliveries and opens and handle suppressions (bounces, spam complaints, unsubscribes) automatically.
  - icon: 📦
    title: Bulk sending
    details: Stamp, a thin layer over the official postmark gem, adds support for Postmark's Bulk Email API.
  - icon: 🧩
    title: Bring your own UI
    details: Missive provides the primitives. Subscription forms and admin screens stay in your app, built how you want them.
---
