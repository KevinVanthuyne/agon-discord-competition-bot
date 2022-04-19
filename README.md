# Agon
## Discord Competition Bot

The Agon Discord bot that people can interact with to post their scores and see the leaderboard. The bot also announces the new game to play and the winner of the previous game. Admins can use the bot to add games, edit them and start the competition.

For an overview of all Agon components take a look at the [Agon Docker Compose repo](https://github.com/KevinVanthuyne/agon-docker-compose).

## Setup

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

## Docker Hub

Push image to Docker Hub: 
```
docker push kevinvt/agon-discord-competition-bot:latest
```