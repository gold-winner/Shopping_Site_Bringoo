import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { filter } from 'rxjs/operators';

import { MultiLangV2InputComponent } from '../../controls/multi-lang-v2/multi-lang-v2-input.component';
import { MdMultiLangControllerComponent } from '../../modules/markdown/components/md-multi-lang-controller/md-multi-lang-controller.component';
import { LanguagesService } from '../../services/languages.service';

@Component({
  selector: 'app-lang-controller',
  templateUrl: './lang-controller.component.html',
  styleUrls: ['./lang-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'd-block mb-4' },
})
export class LangControllerComponent implements AfterViewInit, OnInit {
  languages: string[] = [];
  @Input() borderLess: boolean = false;
  @Input() paddingLess: boolean = false;

  @ContentChildren(MultiLangV2InputComponent, { descendants: true }) viewChildren!: QueryList<MultiLangV2InputComponent>;
  @ContentChildren(MdMultiLangControllerComponent, { descendants: true }) mdChildren!: QueryList<MdMultiLangControllerComponent>;

  primaryLang: string = '';
  isRequired: boolean = false;

  constructor(public readonly service: LanguagesService) {}

  ngOnInit(): void {
    if (this.service.languages.length === 0) {
      this.service.isLoading.pipe(filter((status: boolean) => !status)).subscribe(() => {
        this.languages = this.service.languages;
        this.primaryLang = this.service.primaryLang;
      });
    } else {
      this.languages = this.service.languages;
      this.primaryLang = this.service.primaryLang;
    }
  }

  ngAfterViewInit(): void {
    this.getRequiredType();
  }

  onIndexChange(index: number): void {
    const language: string = this.languages[index];
    const children: (MultiLangV2InputComponent | MdMultiLangControllerComponent)[] = [
      ...this.viewChildren.toArray(),
      ...this.mdChildren.toArray(),
    ];

    for (const viewChild of children) {
      viewChild.language = language;
    }
  }

  getRequiredType(): void {
    this.isRequired = this.viewChildren.some(({ isRequired }: MultiLangV2InputComponent) => isRequired);
  }
}
