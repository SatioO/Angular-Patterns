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
	selector: "bank-details",
	templateUrl: "./bank-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	@Input() data: { [key: string]: string };
	@Output() tabs = new EventEmitter<any>();

	bankForm: FormGroup;

	currentIndex: number = 1;
	bank: Array<number> = [1];

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.bankForm = this._fb.group({
			BM1_Beneficiary_Name: new FormControl(null, [Validators.required]),
			BM1_Bank_Name: new FormControl(null, [Validators.required]),
			BM1_Bank_Branch: new FormControl(null, [Validators.required]),
			BM1_Bank_AccNo: new FormControl(null, [Validators.required]),
			BM1_IFSC_Code: new FormControl(null, [Validators.required]),

			BM2_Beneficiary_Name: new FormControl(null, []),
			BM2_Bank_Name: new FormControl(null, []),
			BM2_Bank_Branch: new FormControl(null, []),
			BM2_Bank_AccNo: new FormControl(null, []),
			BM2_IFSC_Code: new FormControl(null, []),

			BM3_Beneficiary_Name: new FormControl(null, []),
			BM3_Bank_Name: new FormControl(null, []),
			BM3_Bank_Branch: new FormControl(null, []),
			BM3_Bank_AccNo: new FormControl(null, []),
			BM3_IFSC_Code: new FormControl(null, []),

			BM4_Beneficiary_Name: new FormControl(null, []),
			BM4_Bank_Name: new FormControl(null, []),
			BM4_Bank_Branch: new FormControl(null, []),
			BM4_Bank_AccNo: new FormControl(null, []),
			BM4_IFSC_Code: new FormControl(null, [])
		});

		if (!!this.data) {
			this.bankForm.patchValue({
				BM1_Beneficiary_Name: this.data.BM1_Beneficiary_Name,
				BM1_Bank_Name: this.data.BM1_Bank_Name,
				BM1_Bank_Branch: this.data.BM1_Bank_Branch,
				BM1_Bank_AccNo: this.data.BM1_Bank_AccNo,
				BM1_IFSC_Code: this.data.BM1_IFSC_Code,

				BM2_Beneficiary_Name: this.data.BM2_Beneficiary_Name,
				BM2_Bank_Name: this.data.BM2_Bank_Name,
				BM2_Bank_Branch: this.data.BM2_Bank_Branch,
				BM2_Bank_AccNo: this.data.BM2_Bank_AccNo,
				BM2_IFSC_Code: this.data.BM2_IFSC_Code,

				BM3_Beneficiary_Name: this.data.BM3_Beneficiary_Name,
				BM3_Bank_Name: this.data.BM3_Bank_Name,
				BM3_Bank_Branch: this.data.BM3_Bank_Branch,
				BM3_Bank_AccNo: this.data.BM3_Bank_AccNo,
				BM3_IFSC_Code: this.data.BM3_IFSC_Code,

				BM4_Beneficiary_Name: this.data.BM4_Beneficiary_Name,
				BM4_Bank_Name: this.data.BM4_Bank_Name,
				BM4_Bank_Branch: this.data.BM4_Bank_Branch,
				BM4_Bank_AccNo: this.data.BM4_Bank_AccNo,
				BM4_IFSC_Code: this.data.BM4_IFSC_Code
			});
		}
	}

	handleAdd() {
		if (this.currentIndex >= 4) {
			return;
		}

		this.bank = [...this.bank, this.currentIndex + 1];
		this.currentIndex++;
	}

	handleRemove() {
		if (this.currentIndex === 1) {
			return;
		}

		this.bank.splice(this.currentIndex - 1, 1);

		this.bankForm.patchValue({
			[`Bank_FC${this.currentIndex}_BeneficiaryName`]: "",
			[`Bank_FC${this.currentIndex}_BankName`]: "",
			[`Bank_FC${this.currentIndex}_BankBranch`]: "",
			[`Bank_FC${this.currentIndex}_BankNumber`]: "",
			[`Bank_FC${this.currentIndex}_BankIFSC`]: ""
		});

		this.currentIndex--;
	}

	handleTabs(name, status?) {
		this.tabs.emit({
			name: name,
			status: !!status ? status : this.bankForm.status,
			values: this.bankForm.value,
			additional: null,
			back: !!status ? true : false
		});
	}
}
