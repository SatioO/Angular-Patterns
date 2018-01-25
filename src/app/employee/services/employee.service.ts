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

	update(employee) {
		return this._http.put(`${environment.baseUrl}/employee`, employee);
	}

	delete(employee_id) {
		return this._http.delete(
			`${environment.baseUrl}/employee?id=${employee_id}`
		);
	}

	upload(picture) {
		return this._http.post(
			`${environment.baseUrl}/employee/upload`,
			picture
		);
	}

	normalizeEntity(employees) {
		return employees.reduce(
			(
				entities: { [id: number]: fromModels.Employee },
				employee: fromModels.Employee
			) => {
				return {
					...entities,
					[employee.Emp_Master_No]: employee
				};
			},
			{}
		);
	}
}
