import {
	Component,
	Input,
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
import { FormArray } from "@angular/forms/src/model";

@Component({
	selector: "personal-details",
	templateUrl: "./personal-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalDetailsComponent implements OnChanges {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	@Output() tabs = new EventEmitter<any>();

	businesspartnerForm: FormGroup;
	urlpattern: string = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";

	department: fromStore.Store[];
	industry: fromStore.Store[];
	entitytype: fromStore.Store[];

	constructor(private _fb: FormBuilder) {
		this.businesspartnerForm = this._fb.group({
			BM_Company_Name: new FormControl("", [Validators.required]),
			BM_Director1: new FormControl("", []),
			Comp_Dire2: new FormControl("", []),
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
	}

	ngOnChanges(changes) {
		if (!!changes.store.currentValue) {
			this.department = changes.store.currentValue[fromStore.DEPARTMENT];
			this.industry = changes.store.currentValue[fromStore.INDUSTRY];
			this.entitytype = changes.store.currentValue[fromStore.ENTITY_TYPE];
		}
	}

	handleTabs(name) {
		this.tabs.emit({ name: name, status: this.businesspartnerForm.status });
	}
}
