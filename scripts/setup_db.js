#!/usr/bin/env node

const debug = require('debug')('chef:setup:db');
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const models = require('../api/models')
const uuidv4 = require("uuid/v4");
const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()
const {
  config
} = require('../config');

async function setup() {
  try {
    if (!args.yes) {
      const answer = await prompt([{
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }])

      if (!answer.setup) {
        // this test connection to db
        console.log(`${chalk.yellow('Not Dropping and creating tables...')}`)
        await models.sequelize.authenticate().catch(handleFatalError);
        return console.log('Nothing happened :)')
      } else {
        // this test connection to db
        await models.sequelize.authenticate().catch(handleFatalError);
        // in development enviroment, this verify is tables exist or create them.
        console.log(`${chalk.yellow('Dropping and creating tables...')}`)
        await models.sequelize.sync({
          force: true
        }).catch(handleFatalError);

        // adding default user
        const cond = {
          where: {
            name: 'admin',
            email: 'admin@ksquareinc.com'
          }
        }
        const existingEvent = await models.User.findOne(cond)

        if (existingEvent) {
          console.log(`${chalk.yellow('User exists :S, finishing...')}`)
        }
        console.log(`${chalk.yellow('Creating admin user...')}`)
        const user = {
          id: uuidv4(),
          name: "admin",
          email: "admin@ksquareinc.com",
          lastName: "ksquare",
          password: "12345678"
        }
        const result = await models.User.create(user).catch(handleFatalError)
        console.log(`${chalk.green('User created:')} ${result}`)
      }
    }

    console.log('Success!')
    process.exit(0)
  } catch (err) {
    handleFatalError(err)
  }

}

function handleFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()