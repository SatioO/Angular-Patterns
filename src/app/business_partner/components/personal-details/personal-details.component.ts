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

//models
import * as fromModels from "../../models";

import { FormArray } from "@angular/forms/src/model";

@Component({
	selector: "personal-details",
	templateUrl: "./personal-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDetailsComponent implements OnInit, OnChanges {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	@Input() data: { [key: string]: fromModels.Business[] };
	@Output() tabs = new EventEmitter<any>();

	businesspartnerForm: FormGroup;
	urlpattern: string = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";

	department: fromStore.Store[];
	industry: fromStore.Store[];
	entitytype: fromStore.Store[];

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.businesspartnerForm = this._fb.group({
			Comp_Name: new FormControl("", [Validators.required]),
			Comp_Dire1: new FormControl("", [Validators.required]),
			Comp_Dire2: new FormControl("", [Validators.required]),
			Comp_Web: new FormControl("", [Validators.required]),
			Comp_Email1: new FormControl("", [
				Validators.required,
				Validators.email
			]),
			Comp_Email2: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Comp_Dept: new FormControl("", [Validators.required]),
			Comp_Indu: new FormControl("", [Validators.required]),
			Comp_Enti: new FormControl("", [Validators.required]),
			Comp_Face: new FormControl("", [
				Validators.pattern(this.urlpattern)
			]),
			Comp_Link: new FormControl("", [
				Validators.pattern(this.urlpattern)
			]),
			Comp_Twit: new FormControl("", [
				Validators.pattern(this.urlpattern)
			]),
			Comp_Skyp: new FormControl("", [
				Validators.pattern(this.urlpattern)
			])
		});

		if (!!this.data) {
			this.businesspartnerForm.patchValue({
				Comp_Name: this.data.Comp_Name,
				Comp_Dire1: this.data.Comp_Dire1,
				Comp_Dire2: this.data.Comp_Dire2,
				Comp_Web: this.data.Comp_Web,
				Comp_Email1: this.data.Comp_Email1,
				Comp_Email2: this.data.Comp_Email2,
				Comp_Dept: this.data.Comp_Dept,
				Comp_Indu: this.data.Comp_Indu,
				Comp_Enti: this.data.Comp_Enti,
				Comp_Face: this.data.Comp_Face,
				Comp_Link: this.data.Comp_Link,
				Comp_Twit: this.data.Comp_Twit,
				Comp_Skyp: this.data.Comp_Skyp
			});
		}
	}

	ngOnChanges(changes) {
		if (!!changes.store.currentValue) {
			this.department = changes.store.currentValue[fromStore.DEPARTMENT];
			this.industry = changes.store.currentValue[fromStore.INDUSTRY];
			this.entitytype = changes.store.currentValue[fromStore.ENTITY_TYPE];
		}
	}

	handleTabs(name) {
		this.tabs.emit({
			name: name,
			status: this.businesspartnerForm.status,
			values: this.businesspartnerForm.value
		});
	}
}
