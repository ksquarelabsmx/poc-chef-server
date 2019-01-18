> > > DB

Install docker and run:

```
docker run --name poc-chef -e POSTGRES_PASSWORD=ksquare -e POSTGRES_USER=ksquare -e POSTGRES_DB=poc_chef -p5432:5432 -d postgres
```

# Setup DB

chmod +x ./scripts/setup_db.js
npm run setup
