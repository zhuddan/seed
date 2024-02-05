import fs from 'fs';

export class JsonCache {
  recordFilePath: string;

  constructor(recordFilePath: string) {
    this.recordFilePath = recordFilePath;
  }

  loadRecord() {
    try {
      const data = fs.readFileSync(this.recordFilePath, 'utf8');
      return JSON.parse(data);
    }
    catch (error) {
      return {};
    }
  }

  saveRecord(record: any) {
    fs.writeFileSync(this.recordFilePath, JSON.stringify(record, null, 2), 'utf8');
  }
}