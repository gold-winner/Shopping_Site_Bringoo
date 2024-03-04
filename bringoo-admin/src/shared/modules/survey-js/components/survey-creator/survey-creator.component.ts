import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreatorBase } from 'survey-creator-core';

import { SURVEY_JS_CREATOR_OPTION } from '../../../../const/survey-js-creator-option.const';
import { uuid } from '../../../../helpers/uuid';

@Component({
  selector: 'app-survey-creator',
  templateUrl: 'survey-creator.component.html',
  styleUrls: ['survey-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'd-block', '[style.height]': 'height+"px"' },
})
export class SurveyCreatorComponent implements OnInit {
  @Input() height: number = 500;

  @Output() saveSurveyModel: EventEmitter<object> = new EventEmitter<object>();
  @Input() set model(model: object | null) {
    if (model) {
      this.creator.text = JSON.stringify(model);
    }
  }

  creator!: CreatorBase;

  private readonly _uuid!: string;

  get uuid(): string {
    return this._uuid;
  }

  constructor() {
    this._uuid = uuid();
    this.creator = new CreatorBase(SURVEY_JS_CREATOR_OPTION);
  }

  ngOnInit(): void {
    this.creator.saveSurveyFunc = (saveNo: number, callback: Function): void => {
      callback(saveNo, true);

      this.saveSurveyModel.emit(this.creator.JSON);
    };
  }
}
