// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';

import { ButtonComponent } from '../src/shared/components/button';

export default {
  title: 'Example/Button',
  component: ButtonComponent,
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  props: args,
});

export const Primary: any = Template.bind({});

Primary.args = {
  label: 'Button',
};
