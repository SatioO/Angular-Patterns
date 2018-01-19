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
@Component({
	selector: "bank-details",
	templateUrl: "./bank-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankDetailsComponent implements OnInit {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	@Input() data: { [key: string]: fromModels.Business[] };
	@Output() tabs = new EventEmitter<any>();

	bankForm: FormGroup;

	currentIndex: number = 1;
	bank: Array<number> = [1];

	constructor(private _fb: FormBuilder) {}

	ngOnInit(): void {
		this.bankForm = this._fb.group({
			Bank_FC1_BeneficiaryName: new FormControl("", [
				Validators.required
			]),
			Bank_FC1_BankName: new FormControl("", [Validators.required]),
			Bank_FC1_BankBranch: new FormControl("", [Validators.required]),
			Bank_FC1_BankNumber: new FormControl("", [Validators.required]),
			Bank_FC1_BankIFSC: new FormControl("", [Validators.required]),

			Bank_FC2_BeneficiaryName: new FormControl("", []),
			Bank_FC2_BankName: new FormControl("", []),
			Bank_FC2_BankBranch: new FormControl("", []),
			Bank_FC2__BankNumber: new FormControl("", []),
			Bank_FC2_BankIFSC: new FormControl("", []),

			Bank_FC3_BeneficiaryName: new FormControl("", []),
			Bank_FC3_BankName: new FormControl("", []),
			Bank_FC3_BankBranch: new FormControl("", []),
			Bank_FC3__BankNumber: new FormControl("", []),
			Bank_FC3_BankIFSC: new FormControl("", []),

			Bank_FC4_BeneficiaryName: new FormControl("", []),
			Bank_FC4_BankName: new FormControl("", []),
			Bank_FC4_BankBranch: new FormControl("", []),
			Bank_FC4__BankNumber: new FormControl("", []),
			Bank_FC4_BankIFSC: new FormControl("", [])
		});
		if (!!this.data) {
			this.bankForm.patchValue({
				Bank_FC1_BeneficiaryName: this.data.Bank_FC1_BeneficiaryName,
				Bank_FC1_BankName: this.data.Bank_FC1_BankName,
				Bank_FC1_BankBranch: this.data.Bank_FC1_BankBranch,
				Bank_FC1_BankNumber: this.data.Bank_FC1_BankNumber,
				Bank_FC1_BankIFSC: this.data.Bank_FC1_BankIFSC,
				Bank_FC2_BeneficiaryName: this.data.Bank_FC2_BeneficiaryName,
				Bank_FC2_BankName: this.data.Bank_FC2_BankName,
				Bank_FC2_BankBranch: this.data.Bank_FC2_BankBranch,
				Bank_FC2__BankNumber: this.data.Bank_FC2__BankNumber,
				Bank_FC2_BankIFSC: this.data.Bank_FC2_BankIFSC,
				Bank_FC3_BeneficiaryName: this.data.Bank_FC3_BeneficiaryName,
				Bank_FC3_BankName: this.data.Bank_FC3_BankName,
				Bank_FC3_BankBranch: this.data.Bank_FC3_BankBranch,
				Bank_FC3__BankNumber: this.data.Bank_FC3__BankNumber,
				Bank_FC3_BankIFSC: this.data.Bank_FC3_BankIFSC,
				Bank_FC4_BeneficiaryName: this.data.Bank_FC4_BeneficiaryName,
				Bank_FC4_BankName: this.data.Bank_FC4_BankName,
				Bank_FC4_BankBranch: this.data.Bank_FC4_BankBranch,
				Bank_FC4__BankNumber: this.data.Bank_FC4__BankNumber,
				Bank_FC4_BankIFSC: this.data.Bank_FC4_BankIFSC
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
