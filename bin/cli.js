#!/usr/bin/env node
import { fetchPublicIP, fetchLocalIP, fetchDNSInfo, fetchISPInfo, pingWebsite, speedTest, showCredits } from '../src/networkInfo.js';
import inquirer from 'inquirer';

const runCLI = async () => {
  console.log('\n🌐 Welcome to MyNetwork CLI 🌐\n');

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Choose an option:',
      choices: [
        'Public IP',
        'Local IP',
        'DNS Info',
        'ISP Details',
        'Ping a Website',
        'Run Speed Test',
        'Exit',
      ],
    },
  ]);

  switch (option) {
    case 'Public IP':
      await fetchPublicIP();
      break;
    case 'Local IP':
      await fetchLocalIP();
      break;
    case 'DNS Info':
      await fetchDNSInfo();
      break;
    case 'ISP Details':
      await fetchISPInfo();
      break;
    case 'Ping a Website':
      const { website } = await inquirer.prompt([
        { type: 'input', name: 'website', message: 'Enter website to ping (default: google.com):', default: 'google.com' },
      ]);
      await pingWebsite(website);
      break;
    case 'Run Speed Test':
      await speedTest();
      break;
    case 'Exit':
      console.log(chalk.yellow('\nGoodbye! 👋'));
      return;
  }

  showCredits();
};

runCLI();
