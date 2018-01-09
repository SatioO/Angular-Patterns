import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// modules
import { HomeRoutingModule } from "./home.routing.module";
import { SharedModule } from "../shared";
// containers
import { HomeComponent } from "./home.component";

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, SharedModule],
	exports: [HomeComponent]
})
export class HomeModule {}
