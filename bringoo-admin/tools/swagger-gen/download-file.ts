import { Axios, AxiosResponse } from 'axios';
import { createWriteStream, WriteStream } from 'fs';

export async function downloadFile(fileUrl: string, outputLocationPath: string): Promise<any> {
  const writer: WriteStream = createWriteStream(outputLocationPath);
  const axios: Axios = new Axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  });

  return axios.get(fileUrl).then((response: AxiosResponse<any>) => {
    // eslint-disable-next-line @typescript-eslint/typedef
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error: any = null;
      // eslint-disable-next-line @typescript-eslint/typedef
      writer.on('error', (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
      });
    });
  });
}
