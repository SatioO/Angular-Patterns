import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// rxjs
import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";
import { forkJoin } from "rxjs/observable/forkJoin";
// models
import * as fromModels from "../../models";
// shared
import * as fromShared from "../../../shared";
// services
import * as fromServices from "../../services";

@Component({
	selector: "contact-form",
	templateUrl: "./contact-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent implements OnInit {
	@Input() data: { [key: string]: string };
	@Input() viewmode: boolean = false;

	store$: Observable<{}>;

	countries$: Observable<fromShared.Country[]>;
	states$: Observable<fromShared.State[]>;
	cities$: Observable<fromShared.City[]>;

	tabs: fromModels.Tabs = {
		personal: true,
		contact: false
	};

	payload: { [key: string]: object } = {};
	editmode: boolean = false;

	constructor(
		private _contact: fromServices.ContactService,
		private _store: fromShared.StoreService,
		private _router: Router,
		private _activated: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.store$ = forkJoin([
			this._store.populate(fromShared.TITLE, fromShared.CONTACT_TYPE),
			this._contact.employees(),
			this._contact.companies(),
			this._store.getCountries()
		]).pipe(share());

		if (!!this.data) {
			this.states$ = this._store.getStates(this.data.Con_Country);
			this.cities$ = this._store.getCities(this.data.Con_State);
		}
	}

	public handleTabs(event, form?): void {
		if (!!event) {
			event.preventDefault();
		}

		if (!this.viewmode && form.status !== "VALID") {
			return;
		}

		if (!form.back) {
			this.payload[form.name] = form.values;
			if (!!form.submit) {
				this.handleSubmit(this.payload);
				this._contact.contacts = null;
			}
		}

		this.tabs = {
			personal: false,
			contact: false
		};

		this.tabs[form.name] = true;
	}

	private handleToggle(event): void {
		if (event.type === "country") {
			this.states$ = this._store.getStates(event.value);
		} else if (event.type === "states") {
			this.cities$ = this._store.getCities(event.value);
		}
	}

	private handleEdit() {
		this.viewmode = false;
		this.editmode = true;
		this.tabs = {
			personal: true,
			contact: false
		};
	}

	private handleSubmit(payload) {
		let final = {};
		for (let i in this.payload) {
			final = { ...final, ...this.payload[i] };
		}

		if (
			final["Con_Company_Id"] &&
			typeof final["Con_Company_Id"] === "object"
		) {
			final["Con_Company_Id"] = final["Con_Company_Id"]["BM_No"];
		} else {
			final["Con_Company_Id"] = this.data["Con_Company_Id"];
		}

		final["Con_Status_Flag"] = "T";
		final["CreatedBy"] = this._store.getUser()["Emp_ID"];
		final["UpdatedBy"] = this._store.getUser()["Emp_ID"];

		let form$: Observable<any>;

		if (this.editmode) {
			final["Con_No"] = this._activated.snapshot.params.id;
			form$ = this._contact.update(final);
		} else {
			form$ = this._contact.create(final);
		}

		form$.subscribe(
			data => {
				alertify
					.logPosition("bottom right")
					.maxLogItems(1)
					.success("Contact created successfully.");

				this._router.navigate(["/contact/view"]);
			},
			error => {
				alertify
					.logPosition("bottom right")
					.maxLogItems(1)
					.error("Something Went Wrong!");

				this._router.navigate(["/contact/view"]);
			}
		);
	}
}
