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
	@Input() viewmode: boolean = false;

	store$: Observable<{}>;

	countries$: Observable<fromShared.Country[]>;
	states$: Observable<fromShared.State[]>;
	cities$: Observable<fromShared.City[]>;

	tabs: fromModels.Tabs = {
		personal: false,
		contact: true
	};

	constructor(
		private _contact: fromServices.ContactService,
		private _store: fromShared.StoreService
	) {}

	ngOnInit(): void {
		this.store$ = forkJoin([
			this._store.populate(fromShared.TITLE, fromShared.CONTACT_TYPE),
			this._contact.getEmployees(),
			this._contact.getCompanies()
		]).pipe(share());

		this.countries$ = this._store.getCountries();
	}

	handleTabs(event, form?): void {
		if (!!event) {
			event.preventDefault();
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
}
