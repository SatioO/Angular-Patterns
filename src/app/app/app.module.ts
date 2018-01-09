import { environment } from "@env/environment";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
// components
import { AppComponent } from "./app.component";
// modules
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "../shared";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production
		}),
		HttpClientModule,
		AppRoutingModule,
		SharedModule
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
