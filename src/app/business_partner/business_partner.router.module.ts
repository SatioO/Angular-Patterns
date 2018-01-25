import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// containers
import * as fromContainers from "./containers";

const ROUTES: Routes = [
	{
		path: "",
		redirectTo: "create"
	},
	{
		path: "create",
		component: fromContainers.BusinessPartnerFormComponent
	}
	//   {
	//     path: "view",
	//     component: fromContainers.EmployeeViewComponent
	//   }
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(ROUTES)],
	exports: [RouterModule]
})
export class BusinessPartnerRoutingModule {}
