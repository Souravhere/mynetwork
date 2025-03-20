import execa from 'execa';
import chalk from 'chalk';

// Get Public IP
export async function getPublicIP() {
  try {
    const { stdout } = await execa('curl', ['-s', 'https://api64.ipify.org']);
    return chalk.green(`🌍 Public IP: ${stdout}`);
  } catch (error) {
    return chalk.red('Error fetching public IP');
  }
}

// Get Local IP and Network Info
export async function getLocalIP() {
  try {
    const command = process.platform === 'win32' ? 'ipconfig' : 'ifconfig';
    const { stdout } = await execa(command);
    return chalk.blue(`🏠 Local Network Info:\n${stdout}`);
  } catch (error) {
    return chalk.red('Error fetching local IP');
  }
}

// Get DNS Info
export async function getDNS() {
  try {
    const { stdout } = await execa('nslookup', ['google.com']);
    return chalk.yellow(`🔍 DNS Information:\n${stdout}`);
  } catch (error) {
    return chalk.red('Error fetching DNS information');
  }
}

// Get ISP Details
export async function getISP() {
  try {
    const { stdout } = await execa('curl', ['-s', 'https://ipinfo.io/org']);
    return chalk.cyan(`📡 ISP: ${stdout}`);
  } catch (error) {
    return chalk.red('Error fetching ISP details');
  }
}
