import { environment } from "@env/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// rxjs
import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
// models
import * as fromModels from "../models";

@Injectable()
export class EmployeeService {
	employees: Observable<fromModels.Employee[]>;
	employee: fromModels.Employee;

	constructor(private _http: HttpClient) {}

	getEmployees(): Observable<{ [id: number]: fromModels.Employee }> {
		return this._http
			.get<fromModels.Employee[]>(`${environment.baseUrl}/employee`)
			.pipe(map(employees => this.normalizeEntity(employees)));
	}

	getSearchResults(query): Observable<fromModels.Employee[]> {
		return this._http
			.get<fromModels.Employee[]>(
				`${environment.baseUrl}/employee/search?q=${query}`
			)
			.pipe(map(employees => this.normalizeEntity(employees)));
	}

	saveEmployees(employee) {
		return this._http.post(`${environment.baseUrl}/employee`, employee);
	}

	normalizeEntity(employees) {
		return employees.reduce(
			(
				entities: { [id: number]: fromModels.Employee },
				employee: fromModels.Employee
			) => {
				return {
					...entities,
					[employee.Emp_ID]: employee
				};
			},
			{}
		);
	}
}
