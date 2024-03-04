import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

import { firebaseConfig } from '../../firebase-config';
import { CrudModule } from '../../shared/modules/crud/crud.module';
import { SharedModule } from '../../shared/shared.module';
import { UserSubscriptionComponent } from './components/user-subscription/user-subscription.component';
import { UserSubscriptionFilterComponent } from './components/user-subscription/user-subscription-filter/user-subscription-filter.component';

@NgModule({
  imports: [AngularFireModule.initializeApp(firebaseConfig), AngularFireMessagingModule, SharedModule, CrudModule],
  declarations: [UserSubscriptionFilterComponent, UserSubscriptionComponent],
  exports: [UserSubscriptionComponent],
})
export class PushNotificationModule {}
