import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";

// services
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import * as fromServices from "../../services";

@Component({
	selector: "login",
	templateUrl: "login.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
	constructor(
		private _auth: fromServices.AuthService,
		private _router: Router
	) {}

	handleLogin(creds) {
		this._auth.login(creds).subscribe(
			user => {
				if (!!user) {
					this._auth.saveInfo(user);
					this._router.navigate(["home"]);

					alertify
						.logPosition("bottom right")
						.maxLogItems(1)
						.success("Logged in successfully!");
				} else {
					alertify
						.logPosition("bottom right")
						.maxLogItems(1)
						.error("No user found!");
				}
			},
			error => {
				alertify
					.logPosition("bottom right")
					.maxLogItems(1)
					.error("Something went wrong! Please try again later");
			}
		);
	}
}
