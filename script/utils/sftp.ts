import type { ConnectOptions } from 'ssh2-sftp-client';

// import path from 'path';

import { loading } from './loading';
import { logger } from './logger';

import Client from 'ssh2-sftp-client';

export class SftpTool {
  config: ConnectOptions;
  constructor(config: ConnectOptions) {
    this.config = config;
  }

  ensureRemoteDirectoryExists(remotePath: string) {
    const remoteDirectory = remotePath.substring(0, remotePath.lastIndexOf('/'));
    const sftp = new Client();
    return sftp
      .connect(this.config)
      .then(() => {
        return sftp.exists(remoteDirectory);
      })
      .then((exists) => {
        if (!exists) {
          logger.warning('remoteDirectory does not exist');
          return sftp.mkdir(remoteDirectory, true);
        }
      })
      .finally(() => {
        sftp.end();
      });
  }

  uploadFile(filePath: string, remotePath: string) {
    return new Promise((resolve, reject) => {
      const sftp = new Client();
      loading.show('uploading');
      this.ensureRemoteDirectoryExists(remotePath)
        .then(() => {
          return sftp.connect(this.config);
        }).then(() => {
          return sftp.fastPut(filePath, remotePath);
        })
        .then(() => {
          sftp.end();
          loading.hide();
          resolve('');
        })
        .catch((err) => {
          loading.hide();
          sftp.end();
          logger.error('❌ 上传失败');
          reject(err);
        });
    });
  }

  list(remotePath: string): Promise<Client.FileInfo[]> {
    return new Promise((resolve, reject) => {
      const sftp = new Client();
      sftp
        .connect(this.config)
        .then(() => {
          return sftp.list(remotePath);
        })
        .then((result) => {
          sftp.end();
          resolve(result);
        })
        .catch((err) => {
          sftp.end();
          reject(err);
        });
    });
  }
}

export class SftpQueue {
  queue: Array<() => Promise<void>>;
  isProcessing: boolean;
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  addToQueue(task: { (): Promise<void> }) {
    this.queue.push(task);
    this.processQueue();
  }

  async processQueue() {
    if (this.isProcessing || this.queue.length === 0)
      return;

    this.isProcessing = true;
    const task = this.queue.shift();

    try {
      await task?.();
    }
    catch (error) {
      console.error('Error during task:', error);
    }

    this.isProcessing = false;
    this.processQueue();
  }
}