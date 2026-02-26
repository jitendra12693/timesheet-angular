import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonService } from 'src/app/shared/common.service';
import { TimesheetService } from 'src/app/shared/timesheet.service';

interface TaskModel {
  name: string;
  id: number;
  description: string;
}

interface Timesheet {
  taskId: number;
  employeeId: number;
  startTime: any;
  endTime: any;
  taskName: string;
  employeeName: string;
}

interface Employee {
  id: number;
  name: string;
  code: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './timesheet.component.html'
})

export class TimesheetComponent implements OnInit {
  timeSheetForm: FormGroup = new FormGroup([]);
  timesheetList: Timesheet[] = [];
  filteredTasks: TaskModel[] = [];
  selectedTaskName = '';
  showDropdown = false;
  employeeList: Employee[] = [];
  isShowForm: boolean = false;

  constructor(private _commonService: CommonService
    , private _formBuilder: FormBuilder
    , private _timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.getAllTask();
    this.getAllTimeSheet();
    this.getAllEmployee();
    this.timeSheetForm = this._formBuilder.group({
      taskId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }

  showHide() {
    this.isShowForm = !this.isShowForm;
  }

  taskList: TaskModel[] = [];

  saveTask(event: Event): void {
    event.preventDefault();
    console.log("Value:", this.timeSheetForm.value);
    if (this.timeSheetForm.invalid) {
      alert('Please enter all required field.');
      return;
    }
    this._timesheetService.saveTimesheet(this.timeSheetForm.value).subscribe((response: any) => {
      alert(`New time sheet details added.`);
      this.getAllTimeSheet();
      this.isShowForm = !this.isShowForm;
      this.timeSheetForm.reset();
    }, (error: any) => {
      console.error('Time sheet logging failed:', error);
      alert(`Timesheet logging failed:${error.error.message}`);
    });
  }

  getAllTask() {
    this._commonService.getAllTask().subscribe((result: any) => {
      this.taskList = result;
    });
  }

  getAllTimeSheet() {
    this._timesheetService.getAllTimesheet().subscribe((result: any) => {
      this.timesheetList = result;
    });
  }

  getAllEmployee() {
    this._commonService.getAllEmployee().subscribe((result: any) => {
      this.employeeList = result;
    });
  }

  onTaskSearch(event: any) {
    const value = event.target.value.toLowerCase();
    this.selectedTaskName = event.target.value;
    this.filteredTasks = this.taskList.filter(x =>
      x.name.toLowerCase().includes(value)
    );
    this.showDropdown = true;
  }

  selectTask(task: TaskModel) {
    this.selectedTaskName = task.name;
    this.timeSheetForm.patchValue({
      taskId: task.id
    });
    this.showDropdown = false;
  }
}