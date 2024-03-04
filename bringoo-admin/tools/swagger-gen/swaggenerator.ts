import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { generateApi, GenerateApiOutput } from 'swagger-typescript-api';

import { downloadFile } from './download-file';

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const serversList: { folderName: string; url: string }[] = [
  { url: process.env.API_AUTH_URL as string, folderName: 'auth' },
  { url: process.env.API_DOCS_URL as string, folderName: 'docs' },
  { url: process.env.API_MESSAGE_URL as string, folderName: 'message' },
];

const swaggerFolderPath: string = path.join(__dirname, `../../swagger`);

if (!fs.existsSync(swaggerFolderPath)) {
  fs.mkdirSync(swaggerFolderPath);
}

const apiFolderPath: string = path.join(__dirname, `../../src/shared/api`);

if (!fs.existsSync(apiFolderPath)) {
  fs.mkdirSync(apiFolderPath);
}

async function generateApiFromSwagger(servers: { folderName: string; url: string }[]): Promise<void> {
  for (const { url, folderName } of servers) {
    await downloadFile(url, `./swagger/${folderName}.json`);
    // eslint-disable-next-line no-console
    console.info(`✅ Swagger json successfully downloaded from url ${url}`);
    const folderPath: string = path.join(__dirname, `../../src/shared/api/${folderName}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    } else {
      const oldFiles: string[] = fs.readdirSync(folderPath);
      for (const file of oldFiles) {
        fs.unlinkSync(path.join(folderPath, file));
      }
    }

    const data: GenerateApiOutput = await generateApi({
      url: path.resolve(process.cwd(), `./swagger/${folderName}.json`),
      input: path.resolve(process.cwd(), `./swagger/${folderName}.json`),
      generateRouteTypes: false,
      generateClient: true,
      generateResponses: true,
      extractRequestParams: false,
      modular: true,
      enumNamesAsValues: true,
      templates: path.join(__dirname, './templates/modular'),
    });

    for (const { content, name } of data.files) {
      let kebabCase: string = name
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .toLowerCase();
      if (kebabCase !== 'http-client.ts' && kebabCase !== 'data-contracts.ts') {
        kebabCase = kebabCase.replace(/.ts$/, '.service.ts');
      }
      fs.writeFileSync(path.join(__dirname, `../../src/shared/api/${folderName}/${kebabCase}`), content);
    }
    // eslint-disable-next-line no-console
    console.log(`✅ Complete for ${folderName}, (${data.files.length}) files created`);
  }
}

generateApiFromSwagger(serversList);
