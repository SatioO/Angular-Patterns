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
// guards
import * as fromGuards from "../guards";

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components,
		...fromDirectives.directives
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
	providers: [...fromServices.services, ...fromGuards.guards],
	exports: [
		...fromContainers.containers,
		...fromComponents.components,
		...fromDirectives.directives
	]
})
export class SharedModule {}
