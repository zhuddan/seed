import crypto from 'crypto';
import fs from 'fs';
import http from 'http';
import https from 'https';
// import path from 'path';
import url from 'url';

import { logger } from './logger';

export async function getFileHash(filePathOrURL: string, algorithm = 'sha256'): Promise<string | null> {
  // console.log(`${bold('task.name')} ${strikethrough(`${'task.durationMs'}ms`)}`);

  return new Promise((resolve, reject) => {
    const hash = crypto.createHash(algorithm);

    if (filePathOrURL.startsWith('http:') || filePathOrURL.startsWith('https:')) {
      const parsedURL = url.parse(filePathOrURL);
      const client = parsedURL.protocol === 'https:' ? https : http;

      const request = client.get(filePathOrURL, (response) => {
        if (response.statusCode !== 200) {
          // reject(new Error(`Failed to retrieve file. Status code: ${response.statusCode}`));
          resolve(null);
          logger.warning(`get ${filePathOrURL} error`);
          logger.warning(`Failed to retrieve file. Status code: ${response.statusCode}`);
          return;
        }

        response.on('data', (data) => {
          hash.update(data);
        });

        response.on('end', () => {
          const fileHash = hash.digest('hex');
          // getSuccess(filePathOrURL, fileHash);
          resolve(fileHash);
        });
      });

      request.on('error', (error) => {
        reject(error);
      });
    }
    else {
      const fileStream = fs.createReadStream(filePathOrURL);

      fileStream.on('data', (data) => {
        hash.update(data);
      });

      fileStream.on('end', () => {
        const fileHash = hash.digest('hex');
        // getSuccess(filePathOrURL, fileHash);
        resolve(fileHash);
      });

      fileStream.on('error', (error) => {
        reject(error);
      });
    }
  });
}

// function getSuccess(filePathOrURL: string, fileHash: string) {
//   // logger.info(`${formatPath(filePathOrURL)}`);
//   // logger.info(`${(fileHash)}`);
// }
// function formatPath(file: string) {
//   return path.join(
//     file.replace('E:\\project\\cloud-childcare\\cloud-childcare-uni-app\\packages\\script\\src\\', '~local\\')
//       .replace('https://static.yuntyu.com/', '~remote/'),
//   );
// }