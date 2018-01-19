import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
// rxjs
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
// services
import * as fromServices from "../../services/contact.service";
// models
import * as fromModels from "../../models";

@Component({
	selector: "contact-view",
	templateUrl: "./contact-view.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent {
	contact$: Observable<fromModels.Contact[]>;

	constructor(private _contact: fromServices.ContactService) {}

	ngOnInit(): void {
		this.contact$ = this._contact.contacts.pipe(
			map((entities: { [key: number]: fromModels.Contact }) =>
				Object.keys(entities).map(id => entities[id])
			)
		);
	}

	handleSearch(value: string): void {
		this.contact$ = this._contact
			.getSearchResults(value)
			.pipe(
				map((entities: { [key: number]: fromModels.Contact }) =>
					Object.keys(entities).map(id => entities[id])
				)
			);
	}
}
