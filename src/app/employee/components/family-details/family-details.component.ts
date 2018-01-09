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
	selector: "family-details",
	templateUrl: "./family-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyDetailsComponent implements OnInit, OnChanges {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() data: { [key: string]: string };
	@Input() view: boolean;
	@Output() tabs = new EventEmitter<any>();

	familyForm: FormGroup;

	relations: fromStore.Store[];
	currentIndex: number = 1;
	family: Array<number> = [1];

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.familyForm = this._fb.group({
			Emp_FC1_Name: new FormControl(""),
			Emp_FC1_Relation: new FormControl(""),
			Emp_FC1_Email: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_FC2_Name: new FormControl(""),
			Emp_FC2_Relation: new FormControl(""),
			Emp_FC2_Email: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_FC3_Name: new FormControl(""),
			Emp_FC3_Relation: new FormControl(""),
			Emp_FC3_Email: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_FC4_Name: new FormControl(""),
			Emp_FC4_Relation: new FormControl(""),
			Emp_FC4_Email: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_FC5_Name: new FormControl(""),
			Emp_FC5_Relation: new FormControl(""),
			Emp_FC5_Email: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_FC6_Name: new FormControl(""),
			Emp_FC6_Relation: new FormControl(""),
			Emp_FC6_Email: new FormControl("", [
				Validators.pattern(/[^@]+@[^@]+\.[a-zA-Z]{2,6}/)
			]),
			Emp_Ref1_Name: new FormControl("", [
				Validators.minLength(2),
				Validators.maxLength(50)
			]),
			Emp_Ref1_Company: new FormControl("", [
				Validators.minLength(2),
				Validators.maxLength(50)
			]),
			Emp_Ref1_Phone: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(2),
				Validators.maxLength(12)
			]),
			Emp_Ref2_Name: new FormControl("", [
				Validators.minLength(2),
				Validators.maxLength(50)
			]),
			Emp_Ref2_Company: new FormControl("", [
				Validators.minLength(2),
				Validators.maxLength(50)
			]),
			Emp_Ref2_Phone: new FormControl("", [
				Validators.pattern(/[0-9]*/),
				Validators.minLength(2),
				Validators.maxLength(12)
			])
		});
		if (!!this.data) {
			this.familyForm.patchValue({
				Emp_FC1_Name: this.data.Emp_FC1_Name,
				Emp_FC1_Relation: this.data.Emp_FC1_Relation,
				Emp_FC1_Email: this.data.Emp_FC1_Email,
				Emp_FC2_Name: this.data.Emp_FC2_Name,
				Emp_FC2_Relation: this.data.Emp_FC2_Relation,
				Emp_FC2_Email: this.data.Emp_FC2_Email,
				Emp_FC3_Name: this.data.Emp_FC3_Name,
				Emp_FC3_Relation: this.data.Emp_FC3_Relation,
				Emp_FC3_Email: this.data.Emp_FC3_Email,
				Emp_FC4_Name: this.data.Emp_FC4_Name,
				Emp_FC4_Relation: this.data.Emp_FC4_Relation,
				Emp_FC4_Email: this.data.Emp_FC4_Email,
				Emp_FC5_Name: this.data.Emp_FC5_Name,
				Emp_FC5_Relation: this.data.Emp_FC5_Relation,
				Emp_FC5_Email: this.data.Emp_FC5_Email,
				Emp_FC6_Name: this.data.Emp_FC6_Name,
				Emp_FC6_Relation: this.data.Emp_FC6_Relation,
				Emp_FC6_Email: this.data.Emp_FC6_Email,
				Emp_Ref1_Name: this.data.Emp_Ref1_Name,
				Emp_Ref1_Company: this.data.Emp_Ref1_Company,
				Emp_Ref1_Phone: this.data.Emp_Ref1_Phone,
				Emp_Ref2_Name: this.data.Emp_Ref2_Name,
				Emp_Ref2_Company: this.data.Emp_Ref2_Company,
				Emp_Ref2_Phone: this.data.Emp_Ref2_Phone
			});
		}
		if (!!this.view && !!this.data) {
			for (let i = 2; i <= 6; i++) {
				if (
					this.data[`Emp_FC${i}_Name`].length > 0 ||
					this.data[`Emp_FC${i}_Email`].length > 0
				) {
					this.family = [...this.family, i];
					this.currentIndex++;
				}
			}
		}
	}

	ngOnChanges(changes) {
		if (!!changes.store && !!changes.store.currentValue) {
			this.relations = changes.store.currentValue[fromStore.RELATIONSHIP];
		}
	}

	handleAdd() {
		if (this.currentIndex >= 6) {
			return;
		}

		this.family = [...this.family, this.currentIndex + 1];
		this.currentIndex++;
	}

	handleRemove = () => {
		if (this.currentIndex === 1) {
			return;
		}

		this.family.splice(this.currentIndex - 1, 1);

		this.familyForm.patchValue({
			[`Emp_FC${this.currentIndex}_Name`]: "",
			[`Emp_FC${this.currentIndex}_Relation`]: "",
			[`Emp_FC${this.currentIndex}_Email`]: ""
		});

		this.currentIndex--;
	};

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.familyForm.status,
			values: this.familyForm.value,
			additional: null,
			back: !!status ? true : false
		});
	}
}
