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
// models
import * as fromShared from "../../../shared/models";
import * as fromModels from "../../models";

@Component({
	selector: "contact-details",
	templateUrl: "./contact-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
	@Input() view: boolean = false;
	@Input() data: { [key: string]: fromModels.Contact };

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
			Con_Country: new FormControl("", [Validators.required]),
			Con_State: new FormControl("", [Validators.required]),
			Con_City: new FormControl("", [Validators.required]),
			Con_Pincode: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(8)
			]),
			Con_CCode: new FormControl(null, [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			Con_Phone: new FormControl(null, [
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
				Validators.minLength(4),
				Validators.maxLength(12)
			]),
			Con_AMCode: new FormControl(null, [
				Validators.pattern(/[0-9]*/),
				Validators.maxLength(5)
			]),
			Con_AMobile: new FormControl(null, [
				Validators.minLength(4),
				Validators.maxLength(12)
			])
		});

		if (!!this.data) {
			this.handleValues();
		}
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

	private handleValues() {
		this.contactForm.patchValue({
			Con_Email1: this.data.Con_Email1,
			Con_Email2: this.data.Con_Email2,
			Con_Address: this.data.Con_Address,
			Con_Country: this.data.Con_Country,
			Con_State: this.data.Con_State,
			Con_City: this.data.Con_City,
			Con_Pincode: this.data.Con_Pincode,
			Con_CCode: this.data.Con_CCode,
			Con_Phone: this.data.Con_Phone,
			Con_MCode: this.data.Con_MCode,
			Con_Mobile: this.data.Con_Mobile,
			Con_AMCode: this.data.Con_AMCode,
			Con_AMobile: this.data.Con_AMobile
		});
	}
}
