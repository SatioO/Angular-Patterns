import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";

import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";

// shared
import * as fromShared from "../../../shared";
// services
import * as fromServices from "../../services";
// models
import * as fromModels from "../../models";

@Component({
	selector: "business_partner-form",
	templateUrl: "./business_partner-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessPartnerFormComponent implements OnInit {
	@Input() data: { [key: string]: string };
	@Input() viewmode: boolean = false;

	store$: Observable<{ [key: string]: fromShared.Store[] }>;

	countries$: Observable<fromModels.Country[]>;
	states$: Observable<fromModels.State[]>;
	cities$: Observable<fromModels.City[]>;

	tabs: fromModels.Tabs = {
		personaldetais: true,
		documentdetails: false,
		bankdetails: false,
		contactdetails: false
	};

	payload: { [key: string]: object } = {};

	constructor(
		private _store: fromShared.StoreService,
		private _business_partner: fromServices.Business_PartnerService
	) {}

	ngOnInit(): void {
		this.store$ = this._store.populate(
			fromShared.INDUSTRY,
			fromShared.ENTITY_TYPE,
			fromShared.DEPARTMENT
		);
		this.countries$ = this._business_partner.getCountries();
	}

	handleTabs(event, form): void {
		if (!!event) {
			event.preventDefault();
		}
		if (!this.viewmode && form.status !== "VALID") {
			return;
		}

		this.tabs = {
			personaldetais: false,
			documentdetails: false,
			bankdetails: false,
			contactdetails: false
		};

		if (!form.back) {
			this.payload[form.name] = form.values;

			if (!!form.submit) {
				this.handleSubmit();
			}
		}

		this.tabs[form.name] = true;
	}

	handleToggle(event): void {
		if (event.type === "country") {
			this.states$ = this._business_partner.getStates(event.value);
		} else if (event.type === "states") {
			this.cities$ = this._business_partner.getCities(event.value);
		}
	}
	handleSubmit() {
		let final = {};
		for (let i in this.payload) {
			final = { ...final, ...this.payload[i] };
		}
		console.log(final);

		// this._business_partner
		// 	.saveEmployees(final)
		// 	.subscribe(data => console.log(data), error => console.log(error));
	}

	handleEdit() {
		this.viewmode = false;
	}
}
