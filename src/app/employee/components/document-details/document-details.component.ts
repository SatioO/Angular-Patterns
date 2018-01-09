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

// store
import * as fromStore from "../../../shared/models";
// models
import * as fromModels from "../../models";

@Component({
	selector: "document-details",
	templateUrl: "./document-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() data: { [key: string]: fromModels.Employee[] };
	@Input() view: boolean;
	@Output() tabs = new EventEmitter<any>();

	documentForm: FormGroup;

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.documentForm = this._fb.group({
			Emp_DOJ: new FormControl("", [Validators.required]),
			Emp_DOR: new FormControl("", []),
			Emp_PAN: new FormControl("", [
				Validators.required,
				Validators.pattern(/[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/)
			]),
			Emp_Adhar: new FormControl("", [
				Validators.required,
				Validators.pattern(/[0-9]{12}/)
			]),
			Emp_Pass_No: new FormControl("", [
				Validators.pattern(/^[0-9 \-]+$/)
			]),
			Emp_Pass_Expiry: new FormControl("", []),
			Emp_Bank_Name: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(50)
			]),
			Emp_Bank_AccNo: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(11)
			]),
			Emp_IFSC_Code: new FormControl("", [
				Validators.minLength(4),
				Validators.maxLength(50)
			])
		});
		if (this.data) {
			this.documentForm.patchValue({
				Emp_DOJ: this.data.Emp_DOJ,
				Emp_DOR: this.data.Emp_DOR,
				Emp_PAN: this.data.Emp_PAN,
				Emp_Adhar: this.data.Emp_Adhar,
				Emp_Pass_No: this.data.Emp_Pass_No,
				Emp_Pass_Expiry: this.data.Emp_Pass_Expiry,
				Emp_Bank_Name: this.data.Emp_Bank_Name,
				Emp_Bank_AccNo: this.data.Emp_Bank_AccNo,
				Emp_IFSC_Code: this.data.Emp_IFSC_Code
			});
		}
	}

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.documentForm.status,
			values: this.documentForm.value,
			additional: null,
			submit: true,
			back: !!status ? true : false
		});
	}
}
