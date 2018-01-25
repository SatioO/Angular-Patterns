import { Component } from "@angular/core";
import { Router, NavigationStart } from "@angular/router";
import * as fromServices from "../../../shared";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html"
})
export class AppComponent {
	isLoggedIn: boolean = false;

	constructor(
		private _router: Router,
		private _store: fromServices.StoreService
	) {
		this._router.events.subscribe(event => {
			if (event instanceof NavigationStart) {
				if (event.url === "/login") {
					localStorage.clear();
					document.body.style.backgroundColor = "#f3f3f4";
				}

				this.isLoggedIn = this._store.checkAuth();

				if (this.isLoggedIn) {
					document.body.style.backgroundColor = "#2f4050";
				}
			}
		});
	}
}
