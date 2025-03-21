import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fetch from 'node-fetch';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';

// Utility function for loading animation
const showLoading = (message) => ora({ text: chalk.cyan(message), spinner: 'dots' }).start();

// Fancy ASCII Art Header
export const showHeader = () => {
  console.clear();
  console.log(gradient.pastel(figlet.textSync('MyNetwork', { horizontalLayout: 'full' })));
  console.log(chalk.magenta.bold('\n🌍 Your Ultimate Network Toolbox \n'));
};

// Utility function to format output
const formatOutput = (label, value) => chalk.green.bold(`${label}: `) + chalk.white(value);

// Fetch Public IP
export const fetchPublicIP = async () => {
  const spinner = createSpinner('Fetching Public IP...').start();
  try {
    const { stdout } = await execa('curl', ['-s', 'https://api64.ipify.org']);
    spinner.success({ text: formatOutput('Public IP', stdout) });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch public IP') });
  }
};

// Fetch Local IP (Cross-Platform)
export const fetchLocalIP = async () => {
  const spinner = createSpinner('Fetching Local IP...').start();
  try {
    let stdout;
    if (process.platform === 'win32') {
      ({ stdout } = await execa('ipconfig'));
      const match = stdout.match(/IPv4 Address[.\s]+:\s([\d.]+)/);
      spinner.success({ text: formatOutput('Local IP', match ? match[1] : 'Unknown') });
    } else {
      ({ stdout } = await execa('hostname', ['-I']));
      spinner.success({ text: formatOutput('Local IP', stdout.split(' ')[0] || 'Unknown') });
    }
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch local IP') });
  }
};

// Fetch DNS Info
export const fetchDNSInfo = async () => {
  const spinner = createSpinner('Fetching DNS Info...').start();
  try {
    const { stdout } = await execa('nslookup', ['example.com']);
    const lines = stdout.split('\n');
    const dnsServer = lines.find((line) => line.includes('Address'))?.split(':')[1]?.trim();
    spinner.success({ text: formatOutput('DNS Server', dnsServer || 'Unknown') });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch DNS info') });
  }
};

// Fetch ISP Info
export const fetchISPInfo = async () => {
  const spinner = createSpinner('Fetching ISP Info...').start();
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    spinner.success({ text: formatOutput('ISP', data.org || 'Unknown') });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch ISP info') });
  }
};

// Ping a Website
export const pingWebsite = async (website = 'google.com') => {
  const spinner = createSpinner(`Pinging ${website}...`).start();
  try {
    const { stdout } = await execa('ping', [process.platform === 'win32' ? '-n' : '-c', '4', website]);
    const result = stdout.split('\n')[1] || 'No response';
    spinner.success({ text: formatOutput('Ping Result', result) });
  } catch (error) {
    spinner.error({ text: chalk.red('Ping failed') });
  }
};

// Run Internet Speed Test
export const speedTest = async () => {
  const spinner = createSpinner('Running Speed Test...').start();
  try {
    const { stdout } = await execa('speedtest-cli', ['--simple']);
    spinner.success({ text: formatOutput('Speed Test', stdout) });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to run speed test. Ensure speedtest-cli is installed.') });
  }
};

// Exit Animation
export const showExit = () => {
  console.log(gradient.vice('\n✨ Thank you for using NetInfo CLI! ✨\n'));
};
