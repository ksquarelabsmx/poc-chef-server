# POC CHEF

Just a fancy app for order poc chuc tortas.

## Installing / Getting started

### Useful scripts

Run project in development mode:

```bash
npm run start-dev
```

Generate JS code, for production mode:

```bash
npm run build
```

Remove production code:

```bash
npm run clean
```

Run project in production mode:

```bash
npm run production
```

Generate documentation:

```bash
npm run apidoc
```

## Developing

### Built With

This app uses the following technologies:

- [Typescript](https://www.typescriptlang.org/docs/tutorial.html)
- [Express](http://expressjs.com/en/4x/api.html)

It's recommended to have basic knowledge of those technologies before working with this project.

### Prerequesites

It's neccesary install global dependencies:

```bash

npm install -g nyc mocha source-map-support apidoc
```

### Setting up dev

Download and install dependencies:

```bash
git clone https://github.com/ksquareincmx/poc-chef-server.git
cd poc-chef-server
npm install
```

Set enviroment variables:

```bash
cp env.example .env
```

It's necessary to generate `google oauth` credentials and `jwt secret`, and set enviroment variables.

Generate jwt secret:

```bash
printf "%s\n" $(openssl rand -base64 32 | tr -dc 0-9A-Za-z | head -c 40)
```

[Generate google oauth2 credentials](https://developers.google.com/adwords/api/docs/guides/authentication)

### Building

Execute project in localhost:

```bash
npm run start-dev
```

You must see the next output:

```bash
> chef-api@1.0.0 start-dev /home/user/poc-chef-server
> DEBUG=chef:* NODE_ENV=development nodemon

[nodemon] 1.18.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: /home/mike/GitHub/Ksquare/poc-chef-server/api/**/*
[nodemon] starting `ts-node ./api/server.ts`
  chef:orders:api:configuration Configuration API-Chef-Orders: getting configurations... +0ms
  chef:orders:app app loading... +0ms
  chef:orders:server Server Running on port: 3000 +0ms

```

## Deploying / Publishing

- [Install docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Install docker compose](https://docs.docker.com/compose/install/)

Execute docker compose:

```bash
docker-compose build
docker-compose up
```

TODO: add server configuration

## API Tests

Run project first: `npm run start-dev` or `npm run production`
Run test: `npm run test`

## API Refence

You can see the API documentation in dev mode following the next steps:

```bash
npm run apidoc
npm run start-dev
```

See documentation: `localhost:3000/apidoc`, if you are running your project in production mode you can access change `localhost:port` by your `URL`

## License

Add license here
