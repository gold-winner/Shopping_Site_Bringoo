import { ChangeDetectorRef, Component } from '@angular/core';
import { AppCustomerFaq } from 'src/shared/api/app-customer-faq';
import { FaqItemDto, FaqTopicDto } from 'src/shared/api/data-contracts';
// import { LanguageDto } from 'src/shared/api/data-contracts';
import { IOption } from 'src/shared/components';
@Component({
  selector: 'ui-settings-faq',
  templateUrl: './settings-faq.component.html',
  styleUrls: ['./settings-faq.component.scss'],
})
export class SettingsFaqComponent {
  selectedOption: string = '0';
  options: IOption[] = [];
  faqTopics: FaqTopicDto[] = [];
  faqItems: FaqItemDto[] = [];

  constructor(public readonly appCustomerFaq: AppCustomerFaq, private ref: ChangeDetectorRef) {
    this.appCustomerFaq.getTopicsWithItems().subscribe(
      (res: FaqTopicDto[]) => {
        this.faqTopics = res;
        res.map((item: FaqTopicDto) => {
          this.options.push({
            id: item.id,
            label: item.name,
          });
        });
        this.selectedOption = this.faqTopics[0].id;
        this.faqItems = this.faqTopics[0].items;
        this.ref.detectChanges();
      },
      (err: any) => {
        if (err.status === 401) window.location.href = '/';
      },
    );
  }

  onChangeOption(option: string): void {
    this.selectedOption = option;
    this.faqItems =
      this.faqTopics.find((item: FaqTopicDto) => {
        return item.id === option;
      })?.items ?? [];
  }
}
