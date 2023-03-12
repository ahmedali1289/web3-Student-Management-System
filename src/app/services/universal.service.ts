import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversalService {
  public static header: Subject<any> = new Subject<any>();
  public static sidebar: Subject<any> = new Subject<any>();
  public static AddCourse: Subject<any> = new Subject<any>();
  public static AddStudent: Subject<any> = new Subject<any>();
  public static AddTeachers: Subject<any> = new Subject<any>();
  constructor() { }
}
