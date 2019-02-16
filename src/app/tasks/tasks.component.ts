import { TasksService } from './tasks.service';
import { Task } from './task';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    providers: [TasksService]
})

export class TasksComponent implements OnInit {
    tasks: Task[]
    editTask: Task

    constructor(private taskService: TasksService, private http: HttpClient, public toastr: ToastrManager) { }

    ngOnInit() {
        this.getTasks();
    }

    showSuccess() {
        this.toastr.successToastr('Task Added Successfully.', 'Thanks!');
    }
    showWarning() {
        this.toastr.infoToastr('Task Deleted Successfully.', 'Thanks!');
    }
    showInfo() {
        this.toastr.infoToastr('Task Updated Successfully.', 'Thanks!');
    }
    getTasks(): void {
        this.taskService.getTasks().subscribe(tasks => (this.tasks = tasks))
    }

    add(title: string): void {
        this.editTask = undefined
        title = title.trim()
        if (!title) {
            return
        }
        const newTask: Task = { title } as Task
        this.taskService.addTasks(newTask).subscribe(() => this.getTasks())
        this.showSuccess();
    }

    delete(task: Task): void {
        this.tasks = this.tasks.filter(h => h !== task)
        this.taskService
            .deleteTasks(task.id)
            .subscribe(() => console.log('Task Deleted'))
        this.showWarning();
    }

    edit(task) {
        this.editTask = task
    }

    update() {
        if (this.editTask) {
            this.taskService.updateTask(this.editTask).subscribe(() => {
                this.getTasks()
            })
            this.editTask = undefined
            this.showInfo();
        }
    }
}