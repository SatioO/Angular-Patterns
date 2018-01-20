import { environment } from "@env/environment";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
// containers
import * as fromContainers from "./containers";
// modules
import { AppRoutingModule } from "./app-routing.module";
import * as fromShared from "../shared";

@NgModule({
	declarations: [...fromContainers.containers],
	imports: [
		BrowserModule,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production
		}),
		HttpClientModule,
		AppRoutingModule,
		fromShared.SharedModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: fromShared.AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [...fromContainers.containers]
})
export class AppModule {}
