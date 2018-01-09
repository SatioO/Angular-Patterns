import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Ng2AutoCompleteModule } from "ng2-auto-complete";

// modules
import * as fromRoutes from "./contact-routing.module";
import * as fromShared from "../shared";
// containers
import * as fromContainers from "./containers";
// // components
import * as fromComponents from "./components";
// // services
import * as fromServices from "./services";

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		Ng2AutoCompleteModule,
		fromRoutes.ContactRoutingModule,
		fromShared.SharedModule
	],
	providers: [fromServices.ContactService],
	exports: [...fromContainers.containers]
})
export class ContactModule {}
