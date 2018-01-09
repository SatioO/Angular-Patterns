import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

// models
import * as fromModels from "../../models";

@Component({
	selector: "employee-card",
	templateUrl: "./employee-card.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {
	@Input() employee: fromModels.Employee;
}
