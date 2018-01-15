import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const ROUTES: Routes = [
	{ path: "", pathMatch: "full", redirectTo: "home" },
	{
		path: "home",
		loadChildren: "../home/home.module#HomeModule"
	},
	{
		path: "employee",
		loadChildren: "../employee/employee.module#EmployeeModule"
	},
	{
		path: "contact",
		loadChildren: "../contact/contact.module#ContactModule"
	},
	{
		path: "login",
		loadChildren: "../login/login.module#LoginModule"
	},
	//   {
	//     path: "enquiry",
	//     loadChildren: "@featured/enquiry/enquiry.module#EnquiryModule"
	//   },
	{
		path: "**",
		redirectTo: "home"
	}
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(ROUTES)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
