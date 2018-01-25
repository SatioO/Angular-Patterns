import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

// modules
import { BusinessPartnerRoutingModule } from "./business_partner.router.module";
import { SharedModule } from "../shared";

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
		BusinessPartnerRoutingModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: [...fromServices.services],
	exports: [...fromContainers.containers]
})
export class Business_Partner_Module {}
