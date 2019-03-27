import { authURI } from "./../test/v1/utils";
// load .env file
require("dotenv").config();

import Debug from "debug";
import chalk from "chalk";

const debug = Debug("chef:orders:api:configuration");

debug(
  `Configuration API-Chef-Orders: ${chalk.magenta("getting configurations...")}`
);

const configurations: any = {
  production: {
    server: {
      name: "production",
      port: process.env.PORT
    },
    auth: {
      username: process.env.AUTH_ADMIN_USERNAME,
      password: process.env.AUTH_ADMIN_PASSWORD,
      email: process.env.AUTH_ADMIN_EMAIL,
      jwt_secret: process.env.AUTH_JWT_SECRET,
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        projectId: process.env.GOOGLE_PROJECT_ID,
        authURI: process.env.GOOGLE_AUTH_URI
      }
    }
  },
  testing: {
    server: {
      name: "testing",
      port: process.env.PORT
    }
  },
  development: {
    server: {
      name: "development",
      port: process.env.PORT || "3000"
    },
    auth: {
      username: process.env.AUTH_ADMIN_USERNAME,
      password: process.env.AUTH_ADMIN_PASSWORD,
      email: process.env.AUTH_ADMIN_EMAIL,
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        projectId: process.env.GOOGLE_PROJECT_ID,
        authURI: process.env.GOOGLE_AUTH_URI
      },
      jwt: {
        secret: process.env.AUTH_JWT_SECRET,
        access: {
          expiry: {
            unit: "months",
            length: 2
          },
          subject: "access",
          audience: "user"
        },
        refresh: {
          expiry: {
            unit: "months",
            length: 12
          },
          subject: "refresh",
          audience: "all"
        }
      }
    },
    db: {
      database: process.env.DB_NAME || "poc_chef",
      username: process.env.DB_USER || "ksquare",
      password: process.env.DB_PASS || "ksquare",
      host: process.env.DB_HOST || "localhost",
      dialect: "postgres",
      logging: (s: any) => debug(s),
      pool: {
        max: 10,
        min: 0,
        idle: 10000
      },
      query: {
        raw: true
      }
    }
  }
};

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV || "development";

// return a object with environment configuration
function setEnvironmentConfig(): any {
  switch (environment) {
    case "production":
      return configurations["production"];
    case "development":
      return configurations["development"];
    default:
      return configurations["testing"];
  }
}

const config = setEnvironmentConfig();

export { config };
