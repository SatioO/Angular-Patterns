import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import * as fromGuards from "../shared";

const ROUTES: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "login" },
	{
		path: "home",
		loadChildren: "../home/home.module#HomeModule",
		canActivate: [fromGuards.AuthGuard],
		canLoad: [fromGuards.AuthGuard]
	},
	{
		path: "employee",
		loadChildren: "../employee/employee.module#EmployeeModule",
		canActivate: [fromGuards.AuthGuard],
		canLoad: [fromGuards.AuthGuard]
	},
	{
		path: "enquiry",
		loadChildren: "../enquiry/enquiry.module#EnquiryModule",
		canActivate: [fromGuards.AuthGuard],
		canLoad: [fromGuards.AuthGuard]
	},
	{
		path: "business_partner",
		loadChildren:
			"../business_partner/business_partner.module#Business_Partner_Module",
		canActivate: [fromGuards.AuthGuard],
		canLoad: [fromGuards.AuthGuard]
	},
	{
		path: "contact",
		loadChildren: "../contact/contact.module#ContactModule",
		canActivate: [fromGuards.AuthGuard],
		canLoad: [fromGuards.AuthGuard]
	},
	{
		path: "login",
		loadChildren: "../login/login.module#LoginModule"
	},
	{
		path: "**",
		redirectTo: "login"
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(ROUTES)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
