# Discord Competition Bot

A Discord bot that people can post scores to and that provides a scoreboard.

## Manual setup

1. Install node (v16).
2. Run `npm install` to install all node modules.
3. Rename `config.json.example` to `config.json` and fill in the necessary data.

## Docker setup

1. Build the Docker image: `docker build . -t kevinvt/discord-competition-bot`
2. Run the image: `docker run -d kevinvt/discord-competition-bot`

### Docker commands

- List images: `docker images`
- Get Container id: `docker ps`
- Print logs: `docker logs <container id>`
- Enter container: `docker exec -it <container id> /bin/bash`
