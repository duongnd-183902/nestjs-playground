<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

### Prepare for e2e tests:

```
 cd devops
 docker-compose up -d
```

# ETF Bot

This is a bot designed to monitor and track Exchange Traded Fund (ETF) information, requiring Google Chrome for full functionality. The bot utilizes Puppeteer to interact with web pages, which needs Chrome to be installed on the system.

## Prerequisites
- **Google Chrome Stable**: Puppeteer requires Google Chrome to be installed manually on the system.

## Installing Google Chrome Stable

To run the bot, you need to install Google Chrome Stable. Here’s how to install it manually on a Debian-based system (e.g., Ubuntu):

```bash
# Update package list and install curl and gnupg
apt-get update && apt-get install curl gnupg -y

# Add Google’s signing key
curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

# Add Google Chrome’s repository
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

# Update package list again
apt-get update

# Install Google Chrome Stable
apt-get install google-chrome-stable -y --no-install-recommends

# Clean up
rm -rf /var/lib/apt/lists/*
