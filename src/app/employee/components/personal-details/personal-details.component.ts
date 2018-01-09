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
export class PersonalDetailsComponent implements OnInit, OnChanges {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() data: { [key: string]: fromModels.Employee };
	@Input() view: boolean;
	@Output() tabs = new EventEmitter<any>();

	employeeForm: FormGroup;

	title: fromStore.Store[];
	genders: fromStore.Store[];
	bloodgroups: fromStore.Store[];
	martialstatus: fromStore.Store[];

	selectedFile: { name: string };
	urlpattern: string = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.employeeForm = this._fb.group({
			Emp_Title: new FormControl("", [Validators.required]),
			Emp_Name: new FormControl("", [Validators.required]),
			Emp_MName: new FormControl("", []),
			Emp_Surname: new FormControl("", [Validators.required]),
			Emp_DOB: new FormControl("", [Validators.required]),
			Emp_Gender: new FormControl("", [Validators.required]),
			Emp_BloodG: new FormControl("", []),
			Emp_Marital_Status: new FormControl("", [Validators.required]),
			Emp_DOAnni: new FormControl("", []),
			Emp_Email1: new FormControl("", [
				Validators.required,
				Validators.email
			]),
			Emp_Email2: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_Linkedin: new FormControl("", [
				Validators.pattern(this.urlpattern)
			]),
			Emp_Twitter: new FormControl("", [
				Validators.pattern(this.urlpattern)
			]),
			Emp_FB: new FormControl("", [Validators.pattern(this.urlpattern)]),
			Emp_Pic_Upload: new FormControl("", [Validators.required])
		});

		if (!!this.data) {
			this.employeeForm.patchValue({
				Emp_Title: this.data.Emp_Title,
				Emp_Name: this.data.Emp_Name,
				Emp_MName: this.data.Emp_MName,
				Emp_Surname: this.data.Emp_Surname,
				Emp_DOB: this.data.Emp_DOB,
				Emp_Gender: this.data.Emp_Gender,
				Emp_BloodG: this.data.Emp_BloodG,
				Emp_Marital_Status: this.data.Emp_Marital_Status,
				Emp_DOAnni: this.data.Emp_DOAnni,
				Emp_Email1: this.data.Emp_Email1,
				Emp_Email2: this.data.Emp_Email2,
				Emp_Linkedin: this.data.Emp_Linkedin,
				Emp_Twitter: this.data.Emp_Twitter,
				Emp_FB: this.data.Emp_FB,
				Emp_Pic_Upload: this.data.Emp_Pic_Upload
			});
		}
	}

	ngOnChanges(changes) {
		if (!!changes.store && changes.store.currentValue) {
			this.title = changes.store.currentValue[fromStore.TITLE];
			this.genders = changes.store.currentValue[fromStore.GENDER];
			this.bloodgroups =
				changes.store.currentValue[fromStore.BLOOD_GROUP];
			this.martialstatus =
				changes.store.currentValue[fromStore.MARITAL_STATUS];
		}
	}

	onFileChange($event) {
		let file = $event.target.files[0];
		this.selectedFile = file;
		this.employeeForm.controls["Emp_Pic_Upload"].setValue(
			file ? file.name : ""
		);
	}

	handleMartialStatus() {
		if (
			this.employeeForm.controls["Emp_Marital_Status"].value === "SINGLE"
		) {
			this.employeeForm.controls["Emp_DOAnni"].disable();
		} else {
			this.employeeForm.controls["Emp_DOAnni"].enable();
		}
	}

	handleTabs(name) {
		this.tabs.emit({
			name: name,
			status: this.employeeForm.status,
			values: this.employeeForm.value,
			additional: { file: this.selectedFile }
		});
	}
}
