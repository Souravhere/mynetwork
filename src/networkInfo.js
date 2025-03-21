import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fetch from 'node-fetch';

// Utility function for loading animation
const showLoading = (message) => ora({ text: chalk.cyan(message), spinner: 'dots' }).start();

// Utility function to format the output
const formatOutput = (label, value) => chalk.green.bold(`${label}: `) + chalk.white(value);

// Fetch Public IP
export const fetchPublicIP = async () => {
  const spinner = showLoading('Fetching Public IP...');
  try {
    const { stdout } = await execa('curl', ['-s', 'https://api64.ipify.org']);
    spinner.succeed(formatOutput('Public IP', stdout));
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch public IP'));
  }
};

// Fetch Local IP (Cross-Platform)
export const fetchLocalIP = async () => {
  const spinner = showLoading('Fetching Local IP...');
  try {
    let stdout;
    if (process.platform === 'win32') {
      ({ stdout } = await execa('ipconfig'));
      const match = stdout.match(/IPv4 Address[.\s]+:\s([\d.]+)/);
      spinner.succeed(formatOutput('Local IP', match ? match[1] : 'Unknown'));
    } else {
      ({ stdout } = await execa('hostname', ['-I']));
      spinner.succeed(formatOutput('Local IP', stdout.split(' ')[0] || 'Unknown'));
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch local IP'));
  }
};

// Fetch DNS Info
export const fetchDNSInfo = async () => {
  const spinner = showLoading('Fetching DNS Info...');
  try {
    const { stdout } = await execa('nslookup', ['example.com']);
    const lines = stdout.split('\n');
    const dnsServer = lines.find((line) => line.includes('Address'))?.split(':')[1]?.trim();
    spinner.succeed(formatOutput('DNS Server', dnsServer || 'Unknown'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch DNS info'));
  }
};

// Fetch ISP Information
export const fetchISPInfo = async () => {
  const spinner = showLoading('Fetching ISP Info...');
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    spinner.succeed(formatOutput('ISP', data.org || 'Unknown'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch ISP info'));
  }
};

// Ping a Website
export const pingWebsite = async (website = 'google.com') => {
  const spinner = showLoading(`Pinging ${website}...`);
  try {
    const { stdout } = await execa('ping', [process.platform === 'win32' ? '-n' : '-c', '4', website]);
    const result = stdout.split('\n')[1] || 'No response';
    spinner.succeed(formatOutput('Ping Result', result));
  } catch (error) {
    spinner.fail(chalk.red('Ping failed'));
  }
};

// Run Internet Speed Test
export const speedTest = async () => {
  const spinner = showLoading('Running Speed Test...');
  try {
    const { stdout } = await execa('speedtest-cli', ['--simple']);
    spinner.succeed(formatOutput('Speed Test', stdout));
  } catch (error) {
    spinner.fail(chalk.red('Failed to run speed test. Ensure speedtest-cli is installed.'));
  }
};

// Display Credits
export const showCredits = () => {
  console.log(chalk.magenta.bold('\n✨ Dev by Sourav Chhimpa ✨\n'));
};
