
FROM node

WORKDIR /usr/src/poc-chef

# Install project dependencies
COPY        package.json ./
RUN         npm install --quiet

COPY        . .