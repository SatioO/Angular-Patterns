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
// services
import * as fromServices from "../../services";

@Component({
	selector: "personal-details",
	templateUrl: "./personal-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDetailsComponent implements OnInit, OnChanges {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() data: { [key: string]: fromModels.Business };
	@Input() view: boolean;
	@Output() tabs = new EventEmitter<any>();

	businesspartnerForm: FormGroup;

	department: fromStore.Store[];
	industry: fromStore.Store[];
	entitytype: fromStore.Store[];

	urlpattern: string = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.businesspartnerForm = this._fb.group({
			BM_Company_Name: new FormControl(null, [Validators.required]),
			BM_Website: new FormControl(null, [Validators.required]),
			BM_Director1: new FormControl(null, []),
			BM_Director2: new FormControl(null, []),
			BM_EmailId1: new FormControl(null, [
				Validators.required,
				Validators.email
			]),
			BM_EmailId2: new FormControl(null, [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			BM_Department: new FormControl(null, [Validators.required]),
			BM_IndustryType: new FormControl(null, [Validators.required]),
			BM_Entity_Type: new FormControl(null, [Validators.required]),
			BM_Fb: new FormControl(null, [Validators.pattern(this.urlpattern)]),
			BM_Linkedin: new FormControl(null, [
				Validators.pattern(this.urlpattern)
			]),
			BM_Twitter: new FormControl(null, [
				Validators.pattern(this.urlpattern)
			]),
			BM_SkypeId: new FormControl(null, [
				Validators.pattern(this.urlpattern)
			])
		});

		if (!!this.data) {
			this.businesspartnerForm.patchValue({
				BM_Company_Name: this.data.BM_Company_Name,
				BM_Website: this.data.BM_Website,
				BM_Director1: this.data.BM_Director1,
				BM_Director2: this.data.BM_Director2,
				BM_EmailId1: this.data.BM_EmailId1,
				BM_EmailId2: this.data.BM_EmailId2,
				BM_Department: this.data.BM_Department,
				BM_IndustryType: this.data.BM_IndustryType,
				BM_Entity_Type: this.data.BM_Entity_Type,
				BM_Fb: this.data.BM_Fb,
				BM_Linkedin: this.data.BM_Linkedin,
				BM_Twitter: this.data.BM_Twitter,
				BM_SkypeId: this.data.BM_SkypeId
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
