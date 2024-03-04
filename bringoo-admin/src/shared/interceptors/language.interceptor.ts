import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppLanguageService } from '../services/app-language.service';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private appLanguageService: AppLanguageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(!req.params.get('lang') ? req.clone({ params: req.params.set('lang', this.appLanguageService.language) }) : req);
  }
}
