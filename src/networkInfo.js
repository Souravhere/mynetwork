import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fetch from 'node-fetch';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';
import os from 'os';
import speedTest from 'speedtest-net';

// 🔥 Fancy ASCII Header
export const showHeader = () => {
  console.clear();
  console.log(gradient.pastel(figlet.textSync('NetInfo CLI', { horizontalLayout: 'full' })));
  console.log(chalk.magenta.bold('\n🌍 Your Ultimate Network Toolbox 🌐\n'));
};

// ✅ Utility: Loading Animation
const showLoading = (message) => ora({ text: chalk.cyan(message), spinner: 'dots' }).start();

// ✅ Public IP Fetcher
export const fetchPublicIP = async () => {
  const spinner = createSpinner('Fetching Public IP...').start();
  try {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    spinner.success({ text: chalk.green.bold(`Public IP: `) + chalk.white(data.ip) });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch public IP') });
  }
};

// ✅ FIXED: Local IP Fetcher (Cross-Platform)
export const fetchLocalIP = async () => {
  const spinner = createSpinner('Fetching Local IP...').start();
  try {
    const interfaces = os.networkInterfaces();
    let localIP = 'Unknown';
    
    Object.values(interfaces).forEach((iface) => {
      iface?.forEach((details) => {
        if (!details.internal && details.family === 'IPv4') {
          localIP = details.address;
        }
      });
    });

    spinner.success({ text: chalk.green.bold(`Local IP: `) + chalk.white(localIP) });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch local IP') });
  }
};

// ✅ DNS Info
export const fetchDNSInfo = async () => {
  const spinner = createSpinner('Fetching DNS Info...').start();
  try {
    const { stdout } = await execa('nslookup', ['example.com']);
    const dnsServer = stdout.match(/Address: ([\d.]+)/)?.[1] || 'Unknown';
    spinner.success({ text: chalk.green.bold(`DNS Server: `) + chalk.white(dnsServer) });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch DNS info') });
  }
};

// ✅ ISP Info
export const fetchISPInfo = async () => {
  const spinner = createSpinner('Fetching ISP Info...').start();
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    spinner.success({ text: chalk.green.bold(`ISP: `) + chalk.white(data.org || 'Unknown') });
  } catch (error) {
    spinner.error({ text: chalk.red('Failed to fetch ISP info') });
  }
};

// ✅ Ping Website
export const pingWebsite = async (website = 'google.com') => {
  const spinner = createSpinner(`Pinging ${website}...`).start();
  try {
    const { stdout } = await execa('ping', [process.platform === 'win32' ? '-n' : '-c', '4', website]);
    spinner.success({ text: chalk.green.bold(`Ping Result: `) + chalk.white(stdout.split('\n')[1] || 'No response') });
  } catch (error) {
    spinner.error({ text: chalk.red('Ping failed') });
  }
};

// ✅ FIXED: Speed Test (Using Official Speedtest API)
export const runSpeedTest = async () => {
  const spinner = createSpinner('Running Speed Test...').start();
  try {
    const test = await speedTest();
    spinner.success({
      text: `${chalk.green.bold('Download Speed:')} ${chalk.white(test.download.bandwidth / 125000)} Mbps\n` +
            `${chalk.green.bold('Upload Speed:')} ${chalk.white(test.upload.bandwidth / 125000)} Mbps\n` +
            `${chalk.green.bold('Ping:')} ${chalk.white(test.ping.latency)} ms`
    });
  } catch (error) {
    spinner.error({ text: chalk.red('Speed test failed. Ensure internet is active.') });
  }
};

// ✅ Exit Animation
export const showExit = () => {
  console.log(gradient.vice('\n✨ Thank you for using NetInfo CLI! ✨\n'));
};
