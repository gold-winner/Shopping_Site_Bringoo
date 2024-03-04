import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ButtonComponent } from '../src/shared/components/button';
import Header from './header.component';

export default {
  title: 'Example/Header',
  component: Header,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [CommonModule],
    }),
  ],
} as Meta;

const Template: Story<Header> = (args: Header) => ({
  component: Header,
  props: args,
});

export const LoggedIn: any = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut: any = Template.bind({});
LoggedOut.args = {};
