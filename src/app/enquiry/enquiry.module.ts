import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

//modules
import { EnquiryRoutingModule } from "./enquiry.router.module";
import { SharedModule } from "../shared";
//containers
import * as fromContainers from "./containers";

@NgModule({
	declarations: [...fromContainers.containers],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		EnquiryRoutingModule,
		SharedModule
	],
	exports: [...fromContainers.containers]
})
export class EnquiryModule {}
