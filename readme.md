# Docs
## Installation 
1. Install Docker
2. Run Docker containers for client & server from [.env](.env) file
Starts client app container 

```shell
docker-compose -f ./client/docker-compose.yaml --env-file ./.env up -d
```
Starts server containers
- Infrastructure services (postgres, adminer)
- Application API service
```shell
docker-compose -f ./server/docker-compose.yaml --env-file ./.env up -d
```
