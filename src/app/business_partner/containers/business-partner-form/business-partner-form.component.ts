import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";

//rxjs
import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";

// shared
import * as fromShared from "../../../shared";
// services
import * as fromServices from "../../services";
// models
import * as fromModels from "../../models";

@Component({
	selector: "business-partner-form",
	templateUrl: "./business-partner-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessPartnerFormComponent implements OnInit {
	@Input() data: { [key: string]: string };
	@Input() viewmode: boolean = false;

	store$: Observable<{ [key: string]: fromShared.Store[] }>;

	countries$: Observable<fromShared.Country[]>;
	states$: Observable<fromShared.State[]>;
	cities$: Observable<fromShared.City[]>;

	tabs: fromModels.Tabs = {
		personal: true,
		document: false,
		bank: false,
		contact: false
	};

	payload: { [key: string]: object } = {};
	final_payload = { business: null, photos: null };
	editmode: boolean = false;

	constructor(
		private _store: fromShared.StoreService,
		private _business_partner: fromServices.Business_PartnerService,
		private _router: Router,
		private _activated: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.store$ = this._store.populate(
			fromShared.INDUSTRY,
			fromShared.ENTITY_TYPE,
			fromShared.DEPARTMENT
		);
		this.countries$ = this._business_partner.getCountries();

		if (!!this.data) {
			this.states$ = this._store.getStates(this.data.BM_Country);
			this.cities$ = this._store.getCities(this.data.BM_State);
		}
	}

	handleTabs(event, form): void {
		if (!!event) {
			event.preventDefault();
		}

		if (!this.viewmode && form.status !== "VALID") {
			return;
		}

		this.tabs = {
			personal: false,
			document: false,
			bank: false,
			contact: false
		};

		if (!form.back) {
			this.payload[form.name] = form.values;

			if (!!form.submit) {
				this.handleSubmit();
				this._business_partner.businessess = null;
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
		// console.log(final);
		final["CreatedBy"] = this._store.getUser()["Emp_ID"];
		this.final_payload.business = final;
		this._business_partner.upload(this.final_payload.photos).subscribe(
			data => {
				this._business_partner
					.saveBusiness(this.final_payload)
					.subscribe(
						data => {
							alertify
								.logPosition("bottom right")
								.maxLogItems(1)
								.success(
									"Business Partner created successfully."
								);

							this._router.navigate(["/business_partner/view"]);
						},
						error => {
							alertify
								.logPosition("bottom right")
								.maxLogItems(1)
								.error("Something Went Wrong.");

							this._router.navigate(["/business_partner/view"]);
						}
					);
			},
			error => {
				alertify
					.logPosition("bottom right")
					.maxLogItems(1)
					.success("Image uploading failed.");
			}
		);
	}
}
