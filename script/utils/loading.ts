import { clearConsole } from './clearConsole';

import * as chalk from 'chalk';

class LoadingAnimation {
  private frames: string[] = ['-', '\\', '|', '/'];
  private currentFrame = 0;
  private interval: NodeJS.Timeout | null = null;

  show(msg = 'Loading...') {
    this.interval = setInterval(() => {
      process.stdout.write(`\r${chalk.blue(this.frames[this.currentFrame])} ${chalk.blue(msg)}`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 100);
  }

  hide() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      clearConsole();
      // process.stdout.write(`\r${chalk.green('✔')} Loading complete!\n`);
      // process.stdout.write(`\r${chalk.green('✔')} Loading complete!\n`);
    }
  }
}

export const loading = new LoadingAnimation();