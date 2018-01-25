import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
// rxjs
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
// services
import * as fromServices from "../../services/employee.service";
// models
import * as fromModels from "../../models";

@Component({
	selector: "employee-view",
	templateUrl: "./employee-view.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeViewComponent implements OnInit {
	employees$: Observable<fromModels.Employee[]>;

	constructor(private _employee: fromServices.EmployeeService) {}

	ngOnInit(): void {
		this.employees$ = this._employee.employees.pipe(
			map((entities: { [key: number]: fromModels.Employee }) =>
				Object.keys(entities).map(id => entities[id])
			)
		);
	}

	handleSearch(value: string): void {
		this.employees$ = this._employee
			.getSearchResults(value)
			.pipe(
				map((entities: { [key: number]: fromModels.Employee }) =>
					Object.keys(entities).map(id => entities[id])
				)
			);
	}
}
