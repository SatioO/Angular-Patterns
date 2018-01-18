import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "header-app",
	templateUrl: "header.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	@Input() isLoggedIn: boolean;

	constructor(private _router: Router) {}

	handleLogout(e: Event) {
		e.preventDefault();
		localStorage.clear();
		this._router.navigate(["login"]);
	}
}
