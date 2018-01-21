import {
	Component,
	Input,
	ChangeDetectionStrategy,
	EventEmitter,
	Output,
	OnInit
} from "@angular/core";

import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from "@angular/forms";

// models
import * as fromShared from "../../../shared/models";
import * as fromModels from "../../models";
// services
import * as fromServices from "../../services";

@Component({
	selector: "contact-details",
	templateUrl: "./contact-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromShared.Store[] };
	@Input() data: { [key: string]: fromModels.Employee };
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
			Emp_Add1: new FormControl(null, [
				Validators.required,
				Validators.maxLength(50)
			]),
			Emp_Country: new FormControl(null, [Validators.required]),
			Emp_State: new FormControl(null, [Validators.required]),
			Emp_City: new FormControl(null, [Validators.required]),
			Emp_Pincode: new FormControl(null, [
				Validators.maxLength(6),
				Validators.required,
				Validators.pattern(/[0-9]*/)
			]),
			Emp_CCode: new FormControl(null, [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(1),
				Validators.maxLength(5)
			]),
			Emp_Phone: new FormControl(null, [Validators.maxLength(10)]),
			Emp_MCode: new FormControl(null, [
				Validators.required,
				Validators.maxLength(5)
			]),
			Emp_Mobile: new FormControl(null, [
				Validators.required,
				Validators.maxLength(10)
			]),
			Emp_AMCode: new FormControl(null, [Validators.maxLength(5)]),
			Emp_AMobile: new FormControl(null, [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(10)
			]),
			Emp_Add2: new FormControl(null, [Validators.maxLength(50)]),
			Emp_Country2: new FormControl(null, [Validators.required]),
			Emp_State2: new FormControl(null, [Validators.required]),
			Emp_City2: new FormControl(null, [Validators.required]),
			Emp_Pincode2: new FormControl(null, [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(6)
			])
		});
		if (!!this.data) {
			this.contactForm.patchValue({
				Emp_Add1: this.data.Emp_Add1,
				Emp_Country: this.data.Emp_Country,
				Emp_State: this.data.Emp_State,
				Emp_City: this.data.Emp_City,
				Emp_Pincode: this.data.Emp_Pincode,
				Emp_CCode: this.data.Emp_CCode,
				Emp_Phone: this.data.Emp_Phone,
				Emp_MCode: this.data.Emp_MCode,
				Emp_Mobile: this.data.Emp_Mobile,
				Emp_AMCode: this.data.Emp_AMCode,
				Emp_AMobile: this.data.Emp_AMobile,
				Emp_Add2: this.data.Emp_Add2,
				Emp_Country2: this.data.Emp_Country2,
				Emp_State2: this.data.Emp_State2,
				Emp_City2: this.data.Emp_City2,
				Emp_Pincode2: this.data.Emp_Pincode2
			});
		}
	}

	onCopyFields(event: MouseEvent): void {
		let elmTarget: HTMLInputElement = <HTMLInputElement>event.target;
		if (elmTarget.checked) {
			this.contactForm.patchValue({
				Emp_Add2: this.contactForm.controls["Emp_Add1"].value,
				Emp_Country2: this.contactForm.controls["Emp_Country"].value,
				Emp_State2: this.contactForm.controls["Emp_State"].value,
				Emp_City2: this.contactForm.controls["Emp_City"].value,
				Emp_Pincode2: this.contactForm.controls["Emp_Pincode"].value
			});
		}
	}

	handleToggle(type, event): void {
		if (type === "country") {
			const phonecode = this.countries.filter(
				country => country.id === Number(event.target.value)
			)[0].phonecode;

			this.contactForm.patchValue({
				Emp_MCode: phonecode,
				Emp_AMCode: phonecode
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
			back: !!status ? true : false
		});
	}
}
