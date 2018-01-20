import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
// rxjs
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
// services
import * as fromServices from "../../services";
// models
import * as fromModels from "../../models";

@Component({
	selector: "contact-view",
	templateUrl: "./contact-view.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent implements OnInit {
	contacts$: Observable<fromModels.Contact[]>;

	constructor(private _contacts: fromServices.ContactService) {}

	ngOnInit(): void {
		this.contacts$ = this._contacts.contacts.pipe(
			map((entities: { [key: number]: fromModels.Contact }) =>
				Object.keys(entities).map(id => entities[id])
			)
		);
	}

	handleSearch(value: string): void {
		this.contacts$ = this._contacts
			.search(value)
			.pipe(
				map((entities: { [key: number]: fromModels.Contact }) =>
					Object.keys(entities).map(id => entities[id])
				)
			);
	}
}
