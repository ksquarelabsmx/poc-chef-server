docker run --name poc-chef -e POSTGRES_PASSWORD=ksquare -e POSTGRES_USER=ksquare -e POSTGRES_DB=poc_chef -p5432:5432 -d postgres

chmod +x ./scripts/setup_db.js
