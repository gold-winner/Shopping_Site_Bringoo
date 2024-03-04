import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiDefaultService } from '../services/api-default.service';
import { AppCustomerSurveyControllerSurveysParams, PageableSurveyDto, SurveyDetailsDto } from './data-contracts';

@Injectable({
  providedIn: 'root',
})
export class AppCustomerSurvey extends ApiDefaultService {
  /**
   * No description
   *
   * @tags app-customer-survey
   * @name AppCustomerSurveyControllerSurveys
   * @summary Get Surveys.
   * @request GET:/app-customer-survey/surveys
   * @secure
   * @response `200` `PageableSurveyDto`
   */
  surveys = (query: AppCustomerSurveyControllerSurveysParams): Observable<PageableSurveyDto> =>
    this.request<PageableSurveyDto, any>(`/app-customer-survey/surveys`, 'GET', null, query);

  /**
   * No description
   *
   * @tags app-customer-survey
   * @name AppCustomerSurveyControllerSurveyDetails
   * @summary Get Survey Details.
   * @request GET:/app-customer-survey/survey/{id}
   * @secure
   * @response `200` `SurveyDetailsDto`
   */
  surveyDetails = (id: string): Observable<SurveyDetailsDto> =>
    this.request<SurveyDetailsDto, any>(`/app-customer-survey/survey/${id}`, 'GET');
}
