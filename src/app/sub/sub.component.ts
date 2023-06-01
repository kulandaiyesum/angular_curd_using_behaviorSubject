import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html',
  styleUrls: ['./sub.component.css'],
})
export class SubComponent implements OnInit {
  data$!: Observable<any[]>;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.data$;
    this.dataService.fetchData();
  }
}
