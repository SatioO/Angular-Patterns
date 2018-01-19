import {
	Component,
	OnInit,
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

//models
import * as fromModels from "../../models";

@Component({
	selector: "document-details",
	templateUrl: "./document-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	@Input() data: { [key: string]: fromModels.Business[] };

	@Output() tabs = new EventEmitter<any>();

	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();

	documentForm: FormGroup;
	selectedFile: string;

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.documentForm = this._fb.group({
			Doc_Pan: new FormControl("", [Validators.required]),
			Doc_Gst: new FormControl("", [Validators.required]),
			Doc_Cst: new FormControl("", [Validators.required]),
			Doc_Vat: new FormControl("", [Validators.required]),
			Doc_Pic_Upload: new FormControl("", [Validators.required]),
			Doc_Name: new FormControl("", [Validators.required])
		});

		if (!!this.data) {
			this.documentForm.patchValue({
				Doc_Pan: this.data.Doc_Pan,
				Doc_Gst: this.data.Doc_Gst,
				Doc_Cst: this.data.Doc_Cst,
				Doc_Vat: this.data.Doc_Vat,
				Doc_Pic_Upload: this.data.Doc_Pic_Upload,
				Doc_Name: this.data.Doc_Name
			});
		}
	}

	onFileChange($event) {
		let file = $event.target.files[0];
		this.selectedFile = file;
		this.documentForm.controls["Doc_Pic_Upload"].setValue(
			file ? file.name : ""
		);
	}

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.documentForm.status,
			values: this.documentForm.value,
			additional: { file: this.selectedFile },
			back: !!status ? true : false
		});
	}
}
