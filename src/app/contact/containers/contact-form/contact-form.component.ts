import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";

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
	@Input() viewmode: boolean;

	store$: Observable<{}>;

	countries$: Observable<fromShared.Country[]>;
	states$: Observable<fromShared.State[]>;
	cities$: Observable<fromShared.City[]>;

	tabs: fromModels.Tabs = {
		personal: true,
		contact: false
	};

	payload: { [key: string]: object } = {};

	constructor(
		private _contact: fromServices.ContactService,
		private _store: fromShared.StoreService
	) {}

	ngOnInit(): void {
		this.store$ = forkJoin([
			this._store.populate(fromShared.TITLE, fromShared.CONTACT_TYPE),
			this._contact.getEmployees(),
			this._contact.getCompanies(),
			this._store.getCountries()
		]).pipe(share());
	}

	handleTabs(event, form?): void {
		if (!!event) {
			event.preventDefault();
		}

		if (!this.viewmode && form.status !== "VALID") {
			return;
		}

		if (!form.back) {
			this.payload[form.name] = form.values;

			if (!!form.submit) {
				this.handleSubmit();
			}
		}

		this.tabs = {
			personal: false,
			contact: false
		};

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

		this._contact
			.create(final)
			.subscribe(data => console.log(data), error => console.log(error));
	}
}
