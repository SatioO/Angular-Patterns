import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	Input,
	Output,
	EventEmitter
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl
} from "@angular/forms";

import * as fromShared from "../../../shared/models";

@Component({
	selector: "contact-details",
	templateUrl: "./contact-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
	@Input() view: boolean;

	@Input() countries: fromShared.Country[];
	@Input() cities: fromShared.City[];
	@Input() states: fromShared.State[];

	@Output() tabs: EventEmitter<any> = new EventEmitter<any>();
	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	contactForm: FormGroup;

	constructor(private _fb: FormBuilder) {}

	ngOnInit() {
		this.contactForm = this._fb.group({
			Con_Email1: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Con_Email2: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Con_Address: new FormControl(""),
			Con_Country: new FormControl(""),
			Con_State: new FormControl(""),
			Con_City: new FormControl(""),
			Con_Pincode: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(8)
			]),
			Con_CCode: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			Con_Phone: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(12)
			]),
			Con_MCode: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			Con_Mobile: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(12)
			]),
			Con_AMCode: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			Con_AMobile: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(12)
			])
		});
	}

	handleTabs(name) {
		this.tabs.emit({
			name: name,
			status: this.contactForm.status,
			values: this.contactForm.value,
			submit: true,
			additional: null
		});
	}

	handleToggle(type, event): void {
		if (type === "country") {
			const phonecode = this.countries.filter(
				country => country.id === Number(event.target.value)
			)[0].phonecode;

			this.contactForm.patchValue({
				Con_MCode: phonecode,
				Con_AMCode: phonecode
			});
		}
		this.toggle.emit({ type: type, value: event.target.value });
	}
}
