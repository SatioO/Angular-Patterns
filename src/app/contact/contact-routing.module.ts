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
		component: fromContainers.ContactFormComponent
	},
	{
		path: "view",
		children: [
			{
				path: "",
				component: fromContainers.ContactViewComponent,
				canActivate: [fromGuards.ContactExistsGuards]
			},
			{
				path: ":id",
				component: fromContainers.ContactDetailComponent,
				canActivate: [fromGuards.ContactExistsGuards]
			}
		]
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(ROUTES)],
	exports: [RouterModule]
})
export class ContactRoutingModule {}
