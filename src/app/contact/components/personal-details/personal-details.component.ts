import {
	Component,
	Input,
	OnInit,
	OnChanges,
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

// store
import * as fromStore from "../../../shared";
// models
import * as fromModels from "../../models";

@Component({
	selector: "personal-details",
	templateUrl: "./personal-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean = false;
	@Input() data: { [key: string]: fromModels.Contact };
	@Input() owners: Array<string>;
	@Input() companies: Array<fromModels.Company>;
	@Output() tabs = new EventEmitter<any>();

	personalForm: FormGroup;
	type;

	constructor(private _fb: FormBuilder) {
		this.type = {
			TITLE: fromStore.TITLE,
			CONTACT_TYPE: fromStore.CONTACT_TYPE
		};
	}

	ngOnInit(): void {
		this.personalForm = this._fb.group({
			Con_Title: new FormControl(null, [Validators.required]),
			Con_Name: new FormControl(null, [Validators.required]),
			Con_Mname: new FormControl(null, []),
			Con_Surname: new FormControl(null, [Validators.required]),
			Con_Type: new FormControl(null, [Validators.required]),
			Con_DOB: new FormControl(null),
			Con_Ann_Date: new FormControl(null),
			Con_Company_Id: new FormControl(null, []),
			Con_Designation: new FormControl(null, [Validators.required]),
			Con_Department: new FormControl(null, []),
			Con_Owner: new FormControl(null, [Validators.required]),
			Con_Linkedin: new FormControl(null),
			Con_Twitter: new FormControl(null),
			Con_Fb: new FormControl(null),
			Con_SkypeId: new FormControl(null)
		});

		this.personalForm.get("Con_Company_Id").valueChanges.subscribe(val => {
			if (typeof val === "object") {
				this.personalForm.patchValue({
					Con_Department: val.BM_Department
				});
			}
		});

		if (!!this.data) {
			this.handleValues();
		}
	}

	handleTabs(name) {
		this.tabs.emit({
			name: name,
			status: this.personalForm.status,
			values: this.personalForm.value,
			additional: null
		});
	}

	private handleValues() {
		const company = this.companies.filter((company: any) => {
			return company.BM_No === this.data.Con_Company_Id;
		});

		this.personalForm.patchValue({
			Con_Title: this.data.Con_Title,
			Con_Name: this.data.Con_Name,
			Con_Mname: this.data.Con_Mname,
			Con_Surname: this.data.Con_Surname,
			Con_Type: this.data.Con_Type,
			Con_DOB: this.extractDate(this.data.Con_DOB),
			Con_Ann_Date: this.extractDate(this.data.Con_Ann_Date),
			Con_Company_Id:
				company.length > 0 ? company[0]["BM_Company_Name"] : 0,
			Con_Designation: this.data.Con_Designation,
			Con_Department: this.data.Con_Department,
			Con_Owner: this.data.Con_Owner,
			Con_Linkedin: this.data.Con_Linkedin,
			Con_Twitter: this.data.Con_Twitter,
			Con_Fb: this.data.Con_Fb,
			Con_SkypeId: this.data.Con_SkypeId
		});
	}

	private extractDate(date) {
		if (!!date) {
			const currentDate = new Date(date);
			return currentDate.toISOString().substring(0, 10);
		}
		return date;
	}

	autocompleListFormatter = (data: fromModels.Company) => {
		return data.BM_Company_Name;
	};
}
