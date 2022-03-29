# Discord Competition Bot

A Discord bot that people can post scores to and that provides a scoreboard.

## Setup

### Manual

1. Install node (v16).
2. Run `npm install` to install all node modules.
3. Rename `.env.example` to `.env` and fill in the necessary data.

### Docker

Build the Docker image: 
```
docker build . -t kevinvt/discord-competition-bot
```
Use Docker Compose to run [scored-docker-compose](https://github.com/KevinVanthuyne/scored-docker-compose) and run the entire application.

## Docker Hub

Push image to Docker Hub: 
```
docker push kevinvt/discord-competition-bot:latest
```