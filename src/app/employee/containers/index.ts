import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { EmployeeViewComponent } from "./employee-view/employee-view.component";
import { EmployeeDetailComponent } from "./employee-detail/employee-detail.component";

export const containers: any[] = [
	EmployeeFormComponent,
	EmployeeViewComponent,
	EmployeeDetailComponent
];

export * from "./employee-form/employee-form.component";
export * from "./employee-view/employee-view.component";
export * from "./employee-detail/employee-detail.component";
