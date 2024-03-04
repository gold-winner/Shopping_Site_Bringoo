import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { OrdersTableModule } from '../orders-table/orders-table.module';
import { OrdersBoardComponent } from './components/board/orders-board.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardStatusColumnComponent } from './components/board-status-column/board-status-column.component';
import { OrderBoardRouterModule } from './order-board-router.module';

@NgModule({
  declarations: [OrdersBoardComponent, BoardCardComponent, BoardStatusColumnComponent],
  imports: [SharedModule, OrderBoardRouterModule, OrdersTableModule],
})
export class OrderBoardModule {}
