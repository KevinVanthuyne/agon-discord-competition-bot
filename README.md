# Agon
## Discord Competition Bot

The Agon Discord bot that people can interact with to post their scores and see the leaderboard. The bot also announces the new game to play and the winner of the previous game. Admins can use the bot to add games, edit them and start the competition.

For an overview of all Agon components take a look at the [Agon Docker Compose repo](https://github.com/KevinVanthuyne/agon-docker-compose).

## Bot Setup

- Create a new Discord application: https://discord.com/developers
- Add a bot to the application
- Copy the bot token and client id into the .env (here and/or in the Docker Compose)
- Give the bot the right permissions:
  - `application.commands`
  - `bot`
    - Send messages
    - Create public threads
    - Send messages in thread
    - Manage messages
    - Attach files
- Open the generated URL and add the bot to your server
- Configure the channels in which the bot can post with `/configure channel`
- Add games with `/game add`

Make sure the bot is running first, either directly from this repo or through the Docker Compose.
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