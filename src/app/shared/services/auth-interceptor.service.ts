import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse
} from "@angular/common/http";
import { Router } from "@angular/router";
// rxjs
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
// services
import { StoreService } from "./store.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private _router: Router) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (this._router.url !== "/login") {
			request = request.clone({
				setHeaders: {
					"x-access-token": `${
						JSON.parse(localStorage.getItem("user"))["Token"]
					}`
				}
			});
		}

		return next.handle(request).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						// do stuff with response if you want
						return event;
					}
				},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						if (err.status === 401) {
							// redirect to the login route
							// or show a modal
							alertify
								.logPosition("bottom right")
								.maxLogItems(1)
								.error("Authentication Failed!");

							this._router.navigate(["/login"]);
						}
					}
				}
			)
		);
	}
}
