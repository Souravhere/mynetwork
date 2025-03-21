#!/usr/bin/env node
import inquirer from 'inquirer';
import { 
  fetchPublicIP, 
  fetchLocalIP, 
  fetchDNSInfo, 
  fetchISPInfo, 
  pingWebsite, 
  speedTest, 
  showHeader, 
  showExit 
} from '../src/networkInfo.js';
import chalk from 'chalk';

// Display ASCII Art Header
showHeader();

const runCLI = async () => {
  while (true) {
    const { option } = await inquirer.prompt([
      {
        type: 'list',
        name: 'option',
        message: chalk.cyan('💡 Choose an option:'),
        choices: [
          '🌍 Public IP',
          '🏠 Local IP',
          '📡 DNS Info',
          '🔌 ISP Details',
          '🚀 Ping a Website',
          '⚡ Run Speed Test',
          '❌ Exit',
        ],
      },
    ]);

    switch (option) {
      case '🌍 Public IP':
        await fetchPublicIP();
        break;
      case '🏠 Local IP':
        await fetchLocalIP();
        break;
      case '📡 DNS Info':
        await fetchDNSInfo();
        break;
      case '🔌 ISP Details':
        await fetchISPInfo();
        break;
      case '🚀 Ping a Website':
        const { website } = await inquirer.prompt([
          { type: 'input', name: 'website', message: chalk.blue('🔗 Enter website to ping (default: google.com):'), default: 'google.com' },
        ]);
        await pingWebsite(website);
        break;
      case '⚡ Run Speed Test':
        await speedTest();
        break;
      case '❌ Exit':
        showExit();
        return;
    }
  }
};

runCLI();
