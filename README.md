<p align="center">
  <img width="100px" src="/src/App/logo.svg" />
</p>

# Lunchmoney - It's your data, get paid for it

## A browser extension enabling you to offer your data to websites you visit in exchange for bitcoin

With the Lunchmoney extension, you can visit a website that has implemented the [use-lunch-money hook](https://www.npmjs.com/package/use-lunch-money) and get paid almost instantly in exchange for a set of data. The website can then use that data in real time for things like:
 - [User experience optimizations](#user-experience-optimization)
 - [Hyper personalized marketing](#hyper-personalized-marketing)

### Data payload includes

- [x] email address <span style="color: #bbb">(alice@example.com)</span>
- [x] first name <span style="color: #bbb">(Alice)</span>
- [x] last name <span style="color: #bbb">(Smith)</span>
- [x] gender <span style="color: #bbb">(Female)</span>
- [x] age <span style="color: #bbb">(21)</span>
- [x] zip code <span style="color: #bbb">(94122)</span>

## The Problem

Since the beginning of the internet, companies have used data that you generage while browsing their website to track your behavior, fingerprint you in order to track you across other websites, and willingly hand over data about you to companies like Facebook, Google, Experian. There's an entire multi-billion dollar industry built around monetizing this data, but the people who generate all of this data are not part of the economy.

## The Solution

In order to include people in this "data economy" a couple things need to change. 1. People need technology that sits between them and the websites they're visitng. Cookie banners are currently trying and failling to do this, but it's a bad UX, and most people just hit "accept" in order to dismiss the banner without knowing what they're actually doing. 2. Companies need an incentive to want to pay users for their data, such as data they they've never previously had access to. Also users have never been able to easily monetize this data. That what bitcoin, lightning, and Lunchmoney enable.

## How it works

When you first install the extension, you'll be prompted to put in the data listed in [Data payload includes](#data-payload-includes). You'll also need to connect an LND node to the Lunchmoney extension with the admin macaroon so that it can create BOLT-11 invoices on your behalf.
When you visit a website that has implemented the [use-lunch-money hook](https://www.npmjs.com/package/use-lunch-money) that website will recognize you are a Lunchmoney user and immediately request your data payload. The extension will generate an invoice, and hand it off to the website, if the website pays the invoice, the extension will hand over the data payload to the website. One they've received the payload they're free to do whatever they'd like with it, such as the different [use cases described here](#use-cases).

## Use Cases

### User Experience Optimizations

- A shoe company could use the gender data in order to redirect a user to the men's shoes landing page instead of hoping the users will see the men's shoes navigation on their website.
- A newsletter website could use the email address data to prefill the email subscription form field.
- A weather reporing website could use the user's zip code data to redirect a user to the weather page for that zip code.

### Hyper personalized marketing

- A website could welcome someone who just landed on their website for the first time with text like, "Welcome Alice! We think you'll love these products."

## FAQ

### Why is this good for me?

At first, Airbnb was creepy to people, why would you let a stranger sleep in your house? With the right technology in place people quickly became comfortable with it, allowing home-owners to monetize space in their house they never even considered before. It may seem scary at first to offer such personal data to websites you visit, but this is data websites already collect on you through "back-channel" means. Lunchmoney gives you the ability to make money off of data you've never been able to before.

### Why is this good for companies?

Companies spend a lot of time, effort, and money on user tracking. They use a plethora of tools to capture a "Customer 360" profile about you. Why not get rid of all of those tools, go directly to the user and tell give them bitcoin for that data? This starts a direct relationship between a user and a company the first time the customer ever lands on their website.
