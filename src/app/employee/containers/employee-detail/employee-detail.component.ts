import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// rxjs
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
// services
import * as fromServices from "../../services";
// models
import * as fromModels from "../../models";

@Component({
	selector: "employee-detail",
	templateUrl: "./employee-detail.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailComponent {
	employee$: Observable<fromModels.Employee>;

	constructor(
		private route: ActivatedRoute,
		private _employee: fromServices.EmployeeService
	) {
		this.employee$ = this._employee.employees.pipe(
			map(
				(employees: fromModels.Employee[]) =>
					employees[this.route.snapshot.params.id]
			)
		);

		(<any>window).scrollTo(0, 0);
	}
}
