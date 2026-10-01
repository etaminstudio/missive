import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [llmstxt()],
  },
  title: "Missive",
  description: "Toolbox for managing newsletters in Rails, sending them with Postmark",
  lang: 'en-US',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }]
  ],
  sitemap: {
    hostname: 'https://missive.etamin.studio'
  },
  themeConfig: {
    logo: { src: '/logo.svg', width: 24, height: 24 },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/what-is-missive' },
      { text: 'Reference', link: '/reference/' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Introduction',
          items: [
            { text: "What's Missive?", link: '/what-is-missive' },
            { text: 'Getting started', link: '/getting-started' }
          ]
        },
        {
          text: 'Guides',
          items: [
            { text: 'Connecting your User model', link: '/guide/user-model' },
            { text: 'Subscribers & subscriptions', link: '/guide/subscriptions' },
            { text: 'Senders & lists', link: '/guide/senders-and-lists' },
            { text: 'Postmark webhooks', link: '/guide/webhooks' },
            { text: 'Sending messages <span class="VPBadge warning">WIP</span>', link: '/guide/sending-messages' }
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'Reference manual', link: '/reference/' }
          ]
        }
      ],

      '/reference/': [
        { text: 'Overview', link: '/reference/' },
        {
          text: 'Generators',
          collapsed: false,
          items: [
            { text: 'Installer', link: '/reference/generators/install' }
          ]
        },
        {
          text: 'Models',
          collapsed: false,
          items: [
            { text: 'Sender', link: '/reference/models/sender' },
            { text: 'Subscriber', link: '/reference/models/subscriber' },
            { text: 'Subscription', link: '/reference/models/subscription' },
            { text: 'List', link: '/reference/models/list' },
            { text: 'Message', link: '/reference/models/message' },
            { text: 'Dispatch', link: '/reference/models/dispatch' }
          ]
        },
        {
          text: 'Concerns',
          collapsed: false,
          items: [
            { text: 'User', link: '/reference/concerns/user' },
            { text: 'Suppressible', link: '/reference/concerns/suppressible' }
          ]
        },
        {
          text: 'Postmark',
          collapsed: false,
          items: [
            { text: 'Webhooks endpoint', link: '/reference/postmark/webhooks' },
            { text: 'Stamp API client <span class="VPBadge warning">WIP</span>', link: '/reference/postmark/stamp' }
          ]
        },
        {
          text: 'Configuration',
          collapsed: false,
          items: [
            { text: 'Credentials', link: '/reference/credentials' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/etaminstudio/missive' },
      { icon: { svg: "<svg height='800' preserveAspectRatio='xMidYMid' viewBox='-18.5 0 293 293' width='800' xmlns='http://www.w3.org/2000/svg'><path d='m76.7478977 97.4337652-.1626607-.1626607-36.1106776 36.1106775 87.6741226 87.511462 36.110678-35.948017 51.563445-51.563445-36.110678-36.1106775v-.1626607h-103.12689z'/><path d='m127.823361.97596426-127.6886576 73.19731944v146.3946393l127.6886576 73.197319 127.688657-73.197319v-146.3946393zm103.28955 205.60313774-103.28955 59.533819-103.2895511-59.533819v-118.7423187l103.2895511-59.5338198 103.28955 59.5338198z'/></svg>" }, link: 'https://rubygems.org/gems/missive' }
    ],

    editLink: {
      pattern: 'https://github.com/etaminstudio/missive/edit/main/docs/:path'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Etamin Studio'
    }
  }
})
