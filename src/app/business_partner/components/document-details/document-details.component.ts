import {
	Component,
	Input,
	ChangeDetectionStrategy,
	EventEmitter,
	Output,
	OnInit
} from "@angular/core";
import {
	FormGroup,
	FormBuilder,
	FormControl,
	Validators
} from "@angular/forms";

// models
import * as fromShared from "../../../shared/models";
import * as fromModels from "../../models";
// services
import * as fromServices from "../../services";

@Component({
	selector: "document-details",
	templateUrl: "./document-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromShared.Store[] };
	@Input() data: { [key: string]: fromModels.Business };
	@Input() view: boolean;

	@Output() tabs: EventEmitter<any> = new EventEmitter<any>();
	@Output() toggle: EventEmitter<any> = new EventEmitter<any>();
	@Output() file = new EventEmitter<any>();

	documentForm: FormGroup;
	selectedFile: { name: string };

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.documentForm = this._fb.group({
			BM_PanNo: new FormControl(null, [Validators.required]),
			BM_GSTNo: new FormControl(null, [Validators.required]),
			BM_CSTNo: new FormControl(null, [Validators.required]),
			BM_VATTIN: new FormControl(null, [Validators.required]),
			BM_Document_Upload: new FormControl(null, [Validators.required])
		});

		if (!!this.data) {
			this.documentForm.patchValue({
				BM_PanNo: this.data.BM_PanNo,
				BM_GSTNo: this.data.BM_GSTNo,
				BM_CSTNo: this.data.BM_CSTNo,
				BM_VATTIN: this.data.BM_VATTIN,
				BM_Document_Upload: this.data.BM_Document_Upload
			});
		}
	}

	onFileChange($event) {
		let file = $event.target.files[0];
		this.selectedFile = file;

		this.file.emit(this.selectedFile);

		this.documentForm.controls["BM_Document_Upload"].setValue(
			file ? file.name : ""
		);
	}

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.documentForm.status,
			values: this.documentForm.value,
			additional: null,
			back: !!status ? true : false
		});
	}
}
