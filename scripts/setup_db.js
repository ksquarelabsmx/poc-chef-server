#!/usr/bin/env node

const debug = require('debug')('chef:setup:db');
const inquirer = require('inquirer')
const chalk = require('chalk')
const minimist = require('minimist')
const db = require('../api/models')

const args = minimist(process.argv)
const prompt = inquirer.createPromptModule()
const {
  config
} = require('../config');

async function setup() {
  console.log("hola")
  if (!args.yes) {
    const answer = await prompt([{
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }])

    if (!answer.setup) {
      return console.log('Nothing happened :)')
    } else {
      config.db.setup = true
    }
  }

  await db(config.db).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()