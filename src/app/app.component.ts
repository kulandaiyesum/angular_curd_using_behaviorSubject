import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { TitleF } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data$!: Observable<any[]>;
  title!: TitleF;
  isEdit: boolean = false;
  titleControl!: FormGroup;
  @ViewChild('dataTitleInput') dataTitleInput!: ElementRef;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.title = new TitleF();
    this.titleControl = new FormGroup({
      name: new FormControl('', Validators.required),
    });
    this.data$ = this.dataService.data$;
    this.dataService.fetchData();
  }

  createNewData() {
    console.log(this.title, 'create new data');
    this.dataService.createData(this.title);
    this.clearInputField();
  }

  editData(item: TitleF) {
    this.title.id = item.id;
    this.title.name = item.name;
    this.isEdit = true;
  }

  updateExistingData() {
    console.log(this.title, 'Updated data');
    this.dataService.updateData(this.title);
    this.isEdit = false;
    this.clearInputField();
  }

  deleteData(id: number) {
    this.dataService.deleteData(id);
  }
  clearInputField() {
    this.dataTitleInput.nativeElement.value="";
    this.clearForm();
  }
  clearForm() {
    this.titleControl.reset();
  }
}
