import { ToastrModule } from "../../toaster/toastr.module";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
// directives
import * as fromDirectives from "../directives";
// containers
import * as fromContainers from "../containers";
// components
import * as fromComponents from "../components";
// services
import * as fromServices from "../services";

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components,
		...fromDirectives.directives
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, ToastrModule],
	providers: [...fromServices.services],
	exports: [
		...fromContainers.containers,
		...fromComponents.components,
		...fromDirectives.directives,
		ToastrModule
	]
})
export class SharedModule {}
