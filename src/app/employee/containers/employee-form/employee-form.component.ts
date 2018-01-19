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
	selector: "employee-form",
	templateUrl: "./employee-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
	@Input() data: { [key: string]: string };
	@Input() viewmode: boolean = false;

	store$: Observable<{ [key: string]: fromShared.Store[] }>;

	countries$: Observable<fromShared.Country[]>;
	states$: Observable<fromShared.State[]>;
	cities$: Observable<fromShared.City[]>;

	tabs: fromModels.Tabs = {
		personal: true,
		contact: false,
		family: false,
		document: false
	};

	payload: { [key: string]: object } = {};

	constructor(
		private _store: fromShared.StoreService,
		private _employee: fromServices.EmployeeService
	) {}

	ngOnInit(): void {
		this.store$ = this._store.populate(
			fromShared.GENDER,
			fromShared.BLOOD_GROUP,
			fromShared.TITLE,
			fromShared.MARITAL_STATUS,
			fromShared.RELATIONSHIP
		);

		this.countries$ = this._store.getCountries();
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
			contact: false,
			family: false,
			document: false
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
			this.states$ = this._store.getStates(event.value);
		} else if (event.type === "states") {
			this.cities$ = this._store.getCities(event.value);
		}
	}

	handleSubmit() {
		let final = {};
		for (let i in this.payload) {
			final = { ...final, ...this.payload[i] };
		}
		console.log(final);

		this._employee
			.saveEmployees(final)
			.subscribe(data => console.log(data), error => console.log(error));
	}

	handleEdit() {
		this.viewmode = false;
	}
}
