# Agon

## Discord Competition Bot

The Agon Discord bot that people can interact with to post their scores and see the leaderboard. The bot also announces the new game to play and the winner of the previous game. Admins can use the bot to add games, edit them and start the competition.

For an overview of all Agon components take a look at the [Agon Docker Compose repo](https://github.com/KevinVanthuyne/agon-docker-compose).

## Development setup

Rename `.env.example` to `.env` and fill in the necessary data.

### Manual

1. Install node (v16).
2. Run `npm install` to install all node modules.
3. Run `node .` or `nodemon .` to start the bot.

### Docker

Build the Docker image:

```
docker build . -t kevinvt/agon-discord-competition-bot
```

Use Docker Compose to run [scored-docker-compose](https://github.com/KevinVanthuyne/afon-docker-compose) and run the entire application.

### Docker Hub

Push image to Docker Hub:

```
docker push kevinvt/agon-discord-competition-bot:latest
```

Or both commands together at once:

```
docker build . -t kevinvt/agon-discord-competition-bot && docker push kevinvt/agon-discord-competition-bot:latest
```

## Bot Setup

In order to actually use the bot on a Discord server, this DiscordJS application has to be coupled with a Discord application. This can be done with the following steps:

- Create a new Discord application: https://discord.com/developers
- Add a bot to the application
- Copy the bot token and client id into the .env (here and/or in the Docker Compose)
- Generate an OAuth2 invitation URL with the following permissions:
  - `application.commands`
  - `bot`
    - `Text Permissions`
      - `Send messages`
      - `Manage messages`
      - `Attach files`
- Open the generated URL and add the bot to your server
