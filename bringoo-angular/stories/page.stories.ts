import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ButtonComponent } from '../src/shared/components/button';
import Header from './header.component';
import * as HeaderStories from './header.stories';
import Page from './page.component';

export default {
  title: 'Example/Page',
  component: Header,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent, Header],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<Page> = (args: Page) => ({
  component: Page,
  props: args,
});

export const LoggedIn: any = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut: any = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
