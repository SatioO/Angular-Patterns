import {
	Component,
	Input,
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

@Component({
	selector: "document-details",
	templateUrl: "./document-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailsComponent {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;

	@Output()
	tabs: EventEmitter<{ name: string; status: string }> = new EventEmitter<{
		name: string;
		status: string;
	}>();

	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	documentForm: FormGroup;
	selectedFile: string;

	constructor(private _fb: FormBuilder) {
		this.documentForm = this._fb.group({
			Doc_Pan: new FormControl("", [Validators.required]),
			Doc_Gst: new FormControl("", [Validators.required]),
			Doc_Cst: new FormControl("", [Validators.required]),
			Doc_Vat: new FormControl("", [Validators.required]),
			Doc_Pic_Upload: new FormControl("", [Validators.required]),
			Doc_Name: new FormControl("", [Validators.required])
		});
	}

	onFileChange($event) {
		let file = $event.target.files[0];
		this.selectedFile = file.name;
		this.documentForm.controls["Doc_Pic_Upload"].setValue(
			file ? file.name : ""
		);
	}

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.documentForm.status
		});
	}
}
