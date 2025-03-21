import { execa } from 'execa';
import { showLoading, formatOutput } from './utils.js';
import chalk from 'chalk';
import fetch from 'node-fetch';

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

// Fetch Local IP
export const fetchLocalIP = async () => {
  const spinner = showLoading('Fetching Local IP...');
  try {
    const { stdout } = await execa('ipconfig', ['/all']); // Windows
    const match = stdout.match(/IPv4 Address[.\s]+:\s([\d.]+)/);
    spinner.succeed(formatOutput('Local IP', match ? match[1] : 'Unknown'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch local IP'));
  }
};

// Fetch DNS Info
export const fetchDNSInfo = async () => {
  const spinner = showLoading('Fetching DNS Info...');
  try {
    const { stdout } = await execa('nslookup', ['example.com']);
    spinner.succeed(formatOutput('DNS Server', stdout.split('\n')[3] || 'Unknown'));
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch DNS info'));
  }
};

// Fetch ISP Info
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
    const { stdout } = await execa('ping', ['-c', '4', website]);
    spinner.succeed(formatOutput('Ping Result', stdout.split('\n')[1] || 'No response'));
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
    spinner.fail(chalk.red('Failed to run speed test'));
  }
};
