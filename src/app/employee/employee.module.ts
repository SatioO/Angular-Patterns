import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// modules
import { EmployeeRoutingModule } from "./employee-routing.module";
import * as fromShared from "../shared";
// containers
import * as fromContainers from "./containers";
// components
import * as fromComponents from "./components";
// services
import * as fromServices from "./services";
// guards
import * as fromGuards from "./guards";

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		EmployeeRoutingModule,
		fromShared.SharedModule
	],
	providers: [fromServices.EmployeeService, fromGuards.EmployeeExistsGuards],
	exports: [...fromContainers.containers]
})
export class EmployeeModule {}
