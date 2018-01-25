import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
// rxjs
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { switchMap, map } from "rxjs/operators";
// services
import * as fromServices from "../services";
// models
import * as fromModels from "../models";

@Injectable()
export class ContactExistsGuards implements CanActivate {
	constructor(private _contact: fromServices.ContactService) {}

	canActivate(): Observable<boolean> {
		return this.checkStore();
	}

	private checkStore(): Observable<boolean> {
		if (!!this._contact.contacts) {
			return of(true);
		} else {
			return this._contact.get().pipe(
				map((contacts: fromModels.Contact[]) => {
					this._contact.contacts = of(contacts);
				}),
				switchMap(_ => {
					return of(true);
				})
			);
		}
	}
}
