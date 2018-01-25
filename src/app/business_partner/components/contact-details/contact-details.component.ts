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
	@Input() countries: fromModels.Country[];
	@Input() cities: fromModels.City[];
	@Input() states: fromModels.State[];

	@Output() tabs = new EventEmitter<any>();
	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	contactForm: FormGroup;

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.contactForm = this._fb.group({
			BM_OffAddress: new FormControl(null, [
				Validators.required,
				Validators.maxLength(50)
			]),
			BM_Country: new FormControl(null, [Validators.required]),
			BM_State: new FormControl(null, [Validators.required]),
			BM_City: new FormControl(null, [Validators.required]),
			BM_Pincode: new FormControl(null, [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.minLength(2),
				Validators.maxLength(8)
			]),
			BM_CCode: new FormControl(null, [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(1),
				Validators.maxLength(5)
			]),
			BM_OfficePhone: new FormControl(null, [
				Validators.minLength(4),
				Validators.maxLength(12)
			]),
			BM_MCode: new FormControl(null, [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			BM_Mobile: new FormControl(null, [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.minLength(10),
				Validators.maxLength(12)
			]),
			BM_AMCode: new FormControl(null, [Validators.maxLength(5)]),
			BM_AMobile: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(10),
				Validators.maxLength(12)
			]),
			BM_WarehouseAdd: new FormControl(null, [Validators.maxLength(50)]),
			BM_WCountry: new FormControl(null, [Validators.required]),
			BM_WState: new FormControl(null, [Validators.required]),
			BM_WCity: new FormControl(null, [Validators.required]),
			BM_WPincode: new FormControl(null, [
				Validators.required,
				Validators.pattern(/[0-9]*/),
				Validators.minLength(2),
				Validators.maxLength(8)
			])
		});

		if (!!this.data) {
			this.contactForm.patchValue({
				BM_OffAddress: this.data.BM_OffAddress,
				BM_Country: this.data.BM_Country,
				BM_State: this.data.BM_State,
				BM_City: this.data.BM_City,
				BM_Pincode: this.data.BM_Pincode,
				BM_CCode: this.data.BM_CCode,
				BM_OfficePhone: this.data.BM_OfficePhone,
				BM_MCode: this.data.BM_MCode,
				BM_Mobile: this.data.BM_Mobile,
				BM_AMCode: this.data.BM_AMCode,
				BM_AMobile: this.data.BM_AMobile,
				BM_WarehouseAdd: this.data.BM_WarehouseAdd,
				BM_WCountry: this.data.BM_WCountry,
				BM_WState: this.data.BM_WState,
				BM_WCity: this.data.BM_WCity,
				BM_WPincode: this.data.BM_WPincode
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
