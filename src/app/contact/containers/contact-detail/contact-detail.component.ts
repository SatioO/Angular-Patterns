import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
// rxjs
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
// models
import * as fromModels from "../../models";
// services
import * as fromServices from "../../services";

@Component({
	selector: "contact-detail",
	templateUrl: "./contact-detail.component.html"
})
export class ContactDetailComponent {
	contact$: Observable<fromModels.Contact>;

	constructor(
		private route: ActivatedRoute,
		private _contact: fromServices.ContactService
	) {
		this.contact$ = this._contact.contacts.pipe(
			map(
				(contact: fromModels.Contact[]) =>
					contact[this.route.snapshot.params.id]
			)
		);

		(<any>window).scrollTo(0, 0);
	}
}
