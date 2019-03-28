import chalk from "chalk";
import * as http from "http";
import * as Debug from "debug";

import { app } from "./app";
import { config } from "../config";

const debug = Debug("chef:orders:server");

// create server
const server = new http.Server(app);

// server listening
server.listen(config.server.port, async function() {
  debug(`Server Running on port: ${chalk.cyan(config.server.port)}`);

  const isValidEnv: boolean = ["production", "development", "testing"].some(
    (env: string) => env === config.server.name
  );

  if (!isValidEnv) {
    console.error(
      `NODE_ENV is set to ${
        config.server.name
      }, but only production and development are valid.`
    );
    process.exit(1);
  }
});
