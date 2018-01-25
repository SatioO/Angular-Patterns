import {
	Component,
	ChangeDetectionStrategy,
	EventEmitter,
	Output
} from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder
} from "@angular/forms";

@Component({
	selector: "login-form",
	templateUrl: "./login-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
	@Output() login: EventEmitter<any> = new EventEmitter<any>();

	loginForm: FormGroup;

	constructor(private _fb: FormBuilder) {
		this.loginForm = this._fb.group({
			User_Login: new FormControl("", [Validators.required]),
			User_Password: new FormControl("", [Validators.required])
		});
	}

	handleLogin(): void {
		this.login.emit(this.loginForm.value);
	}
}
