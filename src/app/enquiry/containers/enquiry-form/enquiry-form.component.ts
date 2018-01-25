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

//store
import * as fromStore from "../../../shared";
@Component({
	selector: "enquiry-form",
	templateUrl: "./enquiry-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnquiryFormComponent implements OnChanges {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	enquiry: Array<number> = new Array<number>();

	enquiryForm: FormGroup;

	constructor(private _fb: FormBuilder) {
		this.enquiry.push(1);
		this.enquiryForm = this._fb.group({
			Enq_Num: new FormControl("", [Validators.required]),
			Business_Type: new FormControl("", [Validators.required]),
			Enq_Type: new FormControl("", [Validators.required]),
			Source: new FormControl("", [Validators.required]),
			Enq_Date: new FormControl("", [Validators.required]),
			Company_Name: new FormControl("", [Validators.required]),
			Contact_Name: new FormControl("", [Validators.required]),
			Sale_Rep: new FormControl("", [Validators.required]),
			Stage: new FormControl("", [Validators.required]),
			Stage_Reason: new FormControl("", [Validators.required]),

			Serial_Number: new FormControl("", [Validators.required]),
			Part_Number: new FormControl("", [Validators.required]),
			Product: new FormControl("", [Validators.required]),
			Quantity: new FormControl("", [Validators.required]),
			Client_desc: new FormControl("", [Validators.required]),
			Remark: new FormControl("", [Validators.required])
		});
	}

	onAddEnquiry(event): void {
		if (this.enquiry.length < 6) {
			this.enquiry.push(this.enquiry.length + 1);
		}
	}

	onRemoveEnquiry(event): void {
		if (this.enquiry.length > 1) {
			this.enquiry.pop();
		}
	}
	ngOnChanges() {}
}
