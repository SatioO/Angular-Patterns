import { Component, ChangeDetectionStrategy } from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from "@angular/forms";

// services
import * as fromServices from "../../services";

@Component({
	selector: "login-form",
	templateUrl: "./login-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
	loginForm: FormGroup;

	constructor(
		private _fb: FormBuilder,
		private _auth: fromServices.AuthService
	) {
		this.loginForm = this._fb.group({
			User_Login: new FormControl("", [Validators.required]),
			User_Password: new FormControl("", [Validators.required])
		});
	}

	handleLogin(): void {
		this._auth.login(this.loginForm.value).subscribe();
	}
}
