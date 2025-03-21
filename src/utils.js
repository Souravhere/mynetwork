import chalk from 'chalk';
import ora from 'ora';

// Function to display loading spinner
export const showLoading = (message) => {
  const spinner = ora({
    text: chalk.yellow(message),
    spinner: 'dots',
  }).start();
  return spinner;
};

// Function to format output
export const formatOutput = (label, value) => {
  return `${chalk.cyan(label)}: ${chalk.green(value)}`;
};
