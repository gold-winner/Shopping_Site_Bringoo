import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppManagerTaskService } from '../../../../shared/api/auth/app-manager-task.service';
import { ManagerTaskEntity } from '../../../../shared/api/auth/data-contracts';
import { AppLanguageService } from '../../../../shared/services/app-language.service';

type ManagerTaskExtended = ManagerTaskEntity & Record<string, any>;

@Component({
  selector: 'app-manager-tasks',
  host: { class: 'd-block' },
  templateUrl: 'manager-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerTasksComponent {
  openedTasks$: Observable<ManagerTaskExtended[]>;

  constructor(private readonly appManagerTaskService: AppManagerTaskService, private readonly appLanguageService: AppLanguageService) {
    this.openedTasks$ = this.appManagerTaskService.getTasks({ isDone: false }).pipe(
      map((tasks: ManagerTaskEntity[]) =>
        tasks.slice(0, 3).map((task: ManagerTaskEntity) => {
          let title: string = task?.taskType && task?.taskType.toLocaleLowerCase().split('_').join(' ');
          title = title.charAt(0).toUpperCase() + title.slice(1);
          const body: string = (task?.body_i18n && task?.body_i18n[this.appLanguageService.language as any]) || '';

          return {
            ...task,
            title,
            body,
          };
        }),
      ),
    );
  }
}
