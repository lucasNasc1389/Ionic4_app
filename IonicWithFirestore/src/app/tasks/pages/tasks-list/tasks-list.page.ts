import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss']
})
export class TasksListPage {
  tasks$: Observable<Task[]>;

  constructor(
    private navCtrl: NavController,
    private overlay: OverlayService,
    private tasksService: TasksService
  ) {}

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlay.loading();
    this.tasks$ = this.tasksService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
  }

  onUpdate(task: Task): void {
    this.navCtrl.navigateForward(`/tasks/edit/${task.id}`);
  }

  async onDelete(task: Task): Promise<void> {
    await this.overlay.alert({
      message: `Do you really want to delete the task "${task.title}"?`,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            await this.tasksService.delete(task);
            await this.overlay.toast({
              message: `Task "${task.title}" deleted!`
            });
          }
        },
        'No'
      ]
    });
  }

  async onDone(task: Task): Promise<void> {
    const taskToUpdate = { ...task, done: !task.done };
    await this.tasksService.update(taskToUpdate);
    await this.overlay.toast({
      message: `Task "${task.title}" ${taskToUpdate.done ? 'Completed' : 'updated'}!`
    });
  }
}
