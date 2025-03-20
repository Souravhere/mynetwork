#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { getPublicIP, getLocalIP, getDNS, getISP } from '../src/networkInfo.js';

const program = new Command();

async function startCLI() {
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'options',
      message: 'Select the network details you want to fetch:',
      choices: [
        { name: 'Public IP', value: 'publicIP' },
        { name: 'Local IP & Network Info', value: 'localIP' },
        { name: 'DNS Information', value: 'dns' },
        { name: 'ISP Details', value: 'isp' },
      ],
    },
  ]);

  console.log('\nFetching details...\n');

  if (answers.options.includes('publicIP')) console.log(await getPublicIP());
  if (answers.options.includes('localIP')) console.log(await getLocalIP());
  if (answers.options.includes('dns')) console.log(await getDNS());
  if (answers.options.includes('isp')) console.log(await getISP());
}

// Define CLI commands
program
  .version('1.0.0')
  .description('Network Info Fetcher CLI')
  .action(startCLI);

program.parse(process.argv);
