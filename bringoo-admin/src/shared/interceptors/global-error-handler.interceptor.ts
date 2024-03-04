import { ErrorHandler } from '@angular/core';

export class GlobalErrorHandlerInterceptor extends ErrorHandler {
  handleError(error: any): void {
    const chunkFailedMessage: RegExp = /Loading chunk \d+ failed/g;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }
}
