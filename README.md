### Devploment

Install dependencies:

```bash
npm install
```

Install global dependencies:

```bash
npm install -g nyc mocha source-map-support apidoc
```

Run project:

```bash
npm run start-dev
```

Run project;

### Tests

Run project first

```bash
npm run start-dev
```

Run tests:

```bash
npm run test
```

### Documentation

Run project first

```bash
npm run start-dev
```

```bash
npm run apidoc
```

See documentation: `localhost:3000/apidoc`

### Setup DB

```bash
chmod +x ./scripts/setup_db.js
npm run setup
```

Install docker and run DB:

```
docker run --name poc-chef -e POSTGRES_PASSWORD=ksquare -e POSTGRES_USER=ksquare -e POSTGRES_DB=poc_chef -p5432:5432 -d postgres
```
