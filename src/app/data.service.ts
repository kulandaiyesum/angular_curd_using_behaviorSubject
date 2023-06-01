import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TitleF } from './model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  constructor(private http: HttpClient) {}

  fetchData() {
    this.http.get<any[]>('http://localhost:3000/data').subscribe((data) => {
      this.dataSubject.next(data);
    });
  }

  createData(newData: any) {
    this.http
      .post<any>('http://localhost:3000/data', newData)
      .subscribe((data) => {
        this.dataSubject.next([...this.dataSubject.value, data]);
      });
  }

  updateData(updatedData: TitleF) {
    console.log(updatedData);
    this.http
      .put<any>(`http://localhost:3000/data/${updatedData.id}`, updatedData)
      .subscribe(() => {
        const updatedList = this.dataSubject.value.map((data) =>
          data.id === updatedData.id ? updatedData : data
        );
        console.log(updatedList,"updatedList");
        
        this.dataSubject.next(updatedList);
      });
  }

  deleteData(id: number) {
    this.http.delete(`http://localhost:3000/data/${id}`).subscribe(() => {
      const updatedList = this.dataSubject.value.filter(
        (data) => data.id !== id
      );
      this.dataSubject.next(updatedList);
    });
  }
}
