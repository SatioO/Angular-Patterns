import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
// rxjs
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { switchMap, map } from "rxjs/operators";
// services
import * as fromServices from "../services";
// models
import * as fromModels from "../models";

@Injectable()
export class EmployeeExistsGuards implements CanActivate {
	constructor(private _employee: fromServices.EmployeeService) {}

	canActivate(): Observable<boolean> {
		return this.checkStore();
	}

	checkStore(): Observable<boolean> {
		if (!!this._employee.employees) {
			return of(true);
		} else {
			return this._employee.getEmployees().pipe(
				map((employees: fromModels.Employee[]) => {
					this._employee.employees = of(employees);
				}),
				switchMap(_ => {
					return of(true);
				})
			);
		}
	}
}
