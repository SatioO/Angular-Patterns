import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

// containers
import * as fromContainers from "./containers";

const ROUTES: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "view" },
	{
		path: "create",
		component: fromContainers.ContactFormComponent
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(ROUTES)],
	exports: [RouterModule]
})
export class ContactRoutingModule {}
