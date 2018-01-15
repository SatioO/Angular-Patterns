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

@Component({
	selector: "bank-details",
	templateUrl: "./bank-details.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankDetailsComponent {
	@Input() store: { [key: string]: fromStore.Store[] };
	@Input() view: boolean;
	@Output() tabs = new EventEmitter<any>();

	bankForm: FormGroup;

	currentIndex: number = 1;
	bank: Array<number> = [1];

	constructor(private _fb: FormBuilder) {
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
			status: !!status ? status : this.bankForm.status
		});
	}
}
