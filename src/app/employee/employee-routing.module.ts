import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// containers
import * as fromContainers from "./containers";
// guards
import * as fromGuards from "./guards";

const ROUTES: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "view" },
	{
		path: "create",
		component: fromContainers.EmployeeFormComponent
	},
	{
		path: "view",
		canActivate: [fromGuards.EmployeeExistsGuards],
		children: [
			{
				path: "",
				component: fromContainers.EmployeeViewComponent
			},
			{
				path: ":id",
				component: fromContainers.EmployeeDetailComponent
			}
		]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(ROUTES)],
	exports: [RouterModule]
})
export class EmployeeRoutingModule {}
