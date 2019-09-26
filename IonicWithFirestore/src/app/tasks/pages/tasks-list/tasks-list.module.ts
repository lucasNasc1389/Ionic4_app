import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TasksListPage } from './tasks-list.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: TasksListPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), ComponentsModule],
  declarations: [TasksListPage]
})
export class TasksListPageModule {}
