#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import {
  fetchPublicIP,
  fetchLocalIP,
  fetchDNSInfo,
  fetchISPInfo,
  pingWebsite,
  speedTest
} from '../src/networkInfo.js';

const program = new Command();

// Display Title
console.log(chalk.blue(figlet.textSync('My Network', { horizontalLayout: 'full' })));
console.log(chalk.gray('A simple network CLI tool'));
console.log(chalk.yellow('-----------------------------------'));

// Define Commands
program
  .version('1.0.0')
  .description('Network Utility CLI');

// Command: Public IP
program
  .command('public-ip')
  .description('Fetch Public IP')
  .action(fetchPublicIP);

// Command: Local IP
program
  .command('local-ip')
  .description('Fetch Local IP')
  .action(fetchLocalIP);

// Command: DNS Info
program
  .command('dns')
  .description('Fetch DNS Info')
  .action(fetchDNSInfo);

// Command: ISP Info
program
  .command('isp')
  .description('Fetch ISP Details')
  .action(fetchISPInfo);

// Command: Ping
program
  .command('ping <website>')
  .description('Ping a website (default: google.com)')
  .action(pingWebsite);

// Command: Speed Test
program
  .command('speedtest')
  .description('Run Internet Speed Test')
  .action(speedTest);

// Show Credits
program.addHelpText('after', chalk.magenta('\n💻 Dev by Sourav Chhimpa'));

// Parse CLI args
program.parse(process.argv);
