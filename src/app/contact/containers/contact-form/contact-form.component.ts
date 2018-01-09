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

	tabs: fromModels.Tabs = {
		personal: true,
		contact: false
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
}
