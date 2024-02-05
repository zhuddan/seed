import https from 'https';

export async function fetchFileSize(url: string): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const contentLength = response.headers['content-length'];

        if (contentLength)
          resolve(parseInt(contentLength, 10));

        else
          reject(new Error('Content length not available in response headers.'));
      }
      else {
        reject(new Error(`File not found. Status code: ${response.statusCode}`));
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
}
