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
	@Input() view: boolean;
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
			Con_Title: new FormControl("", [Validators.required]),
			Con_Name: new FormControl("", [Validators.required]),
			Con_MName: new FormControl(""),
			Con_Surname: new FormControl("", [Validators.required]),
			Con_Type: new FormControl("", [Validators.required]),
			Con_DOB: new FormControl(""),
			Con_Ann_Date: new FormControl(""),
			Con_Company_Id: new FormControl("", [Validators.required]),
			Con_Designation: new FormControl("", [Validators.required]),
			Con_Department: new FormControl("", [Validators.required]),
			Con_Linkedin: new FormControl(""),
			Con_Twitter: new FormControl(""),
			Con_Fb: new FormControl("")
		});
	}

	handleTabs(name) {
		this.tabs.emit({
			name: name,
			status: this.personalForm.status,
			values: this.personalForm.value,
			additional: null
		});
	}

	autocompleListFormatter = (data: fromModels.Company) => {
		return data.BM_Company_Name;
	};
}
