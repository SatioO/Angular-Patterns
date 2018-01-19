import {
	Component,
	Input,
	OnInit,
	ChangeDetectionStrategy,
	EventEmitter,
	Output
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from "@angular/forms";

import * as fromShared from "../../../shared/models";
// models
import * as fromModels from "../../models";

// store
import * as fromStore from "../../../shared";

@Component({
	selector: "contact-details",
	templateUrl: "./contact-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() data: { [key: string]: fromModels.Business[] };
	@Input() view: boolean;
	@Input() countries: fromShared.Country[];
	@Input() cities: fromShared.City[];
	@Input() states: fromShared.State[];

	@Output() tabs: EventEmitter<any> = new EventEmitter<any>();

	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	contactForm: FormGroup;

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.contactForm = this._fb.group({
			Con_Add1: new FormControl("", [
				Validators.required,
				Validators.maxLength(50)
			]),
			Con_Country: new FormControl("", [Validators.required]),
			Con_State: new FormControl("", [Validators.required]),
			Con_City: new FormControl("", [Validators.required]),
			Con_Pincode: new FormControl("", [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.minLength(2),
				Validators.maxLength(8)
			]),
			Con_CCode: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(1),
				Validators.maxLength(5)
			]),
			Con_Phone: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(12)
			]),
			Con_MCode: new FormControl("", [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			Con_Mobile: new FormControl("", [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.minLength(10),
				Validators.maxLength(12)
			]),
			Con_AMCode: new FormControl("", [Validators.maxLength(5)]),
			Con_AMobile: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(10),
				Validators.maxLength(12)
			]),
			Con_Add2: new FormControl("", [Validators.maxLength(50)]),
			Con_Country2: new FormControl("", [Validators.required]),
			Con_State2: new FormControl("", [Validators.required]),
			Con_City2: new FormControl("", [Validators.required]),
			Con_Pincode2: new FormControl("", [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.minLength(2),
				Validators.maxLength(8)
			])
		});

		if (!!this.data) {
			this.contactForm.patchValue({
				Con_Add1: this.data.Con_Add1,
				Con_Country: this.data.Con_Country,
				Con_State: this.data.Con_State,
				Con_City: this.data.Con_City,
				Con_Pincode: this.data.Con_Pincode,
				Con_CCode: this.data.Con_CCode,
				Con_Phone: this.data.Con_Phone,
				Con_MCode: this.data.Con_MCode,
				Con_Mobile: this.data.Con_Mobile,
				Con_AMCode: this.data.Con_AMCode,
				Con_AMobile: this.data.Con_AMobile,
				Con_Add2: this.data.Con_Add2,
				Con_Country2: this.data.Con_Country2,
				Con_State2: this.data.Con_State2,
				Con_City2: this.data.Con_City2,
				Con_Pincode2: this.data.Con_Pincode2
			});
		}
	}

	OnCopyFields(event: MouseEvent): void {
		let elmTarget: HTMLInputElement = <HTMLInputElement>event.target;
		if (elmTarget.checked) {
			this.contactForm.patchValue({
				Con_Add2: this.contactForm.controls["Con_Add1"].value,
				Con_Country2: this.contactForm.controls["Con_Country"].value,
				Con_State2: this.contactForm.controls["Con_State"].value,
				Con_City2: this.contactForm.controls["Con_City"].value,
				Con_Pincode2: this.contactForm.controls["Con_Pincode"].value
			});
		}
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

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.contactForm.status,
			values: this.contactForm.value,
			additional: null,
			submit: true,
			back: !!status ? true : false
		});
	}
}
