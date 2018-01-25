import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
// modules
import { SharedModule } from "../shared";
import { LoginRoutingModule } from "./login-routing.module";
// containers
import * as fromContainers from "./containers";
// components
import * as fromComponents from "./components";
// services
import * as fromServices from "./services";

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		LoginRoutingModule,
		SharedModule
	],
	providers: [...fromServices.services]
})
export class LoginModule {}
