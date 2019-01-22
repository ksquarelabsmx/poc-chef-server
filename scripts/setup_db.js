#!/usr/bin/env node

const debug = require('debug')('chef:setup:db');
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const models = require('../api/models')

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