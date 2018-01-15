import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";

// store
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
	store$: Observable<{ [key: string]: fromShared.Store[] }>;

	countries$: Observable<fromModels.Country[]>;
	states$: Observable<fromModels.State[]>;
	cities$: Observable<fromModels.City[]>;

	viewmode: boolean = false;

	tabs: fromModels.Tabs = {
		personaldetais: true,
		documentdetails: false,
		bankdetails: false,
		contactdetails: false
	};

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

		if (form.status !== "VALID") {
			return;
		}

		this.tabs = {
			personaldetais: false,
			documentdetails: false,
			bankdetails: false,
			contactdetails: false
		};

		this.tabs[form.name] = true;
	}

	handleToggle(event): void {
		if (event.type === "country") {
			this.states$ = this._business_partner.getStates(event.value);
		} else if (event.type === "states") {
			this.cities$ = this._business_partner.getCities(event.value);
		}
	}
}
