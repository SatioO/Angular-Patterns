import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// containers
import { HomeComponent } from "./home.component";

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: "",
				component: HomeComponent
			}
		])
	],
	exports: [RouterModule]
})
export class HomeRoutingModule {}
