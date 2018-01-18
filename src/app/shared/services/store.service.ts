import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

// rxjs
import { catchError, map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
// environment
import { environment } from "@env/environment";
// models
import * as fromModels from "../models";

@Injectable()
export class StoreService {
	private _store: { [key: string]: fromModels.Store[] };

	constructor(private _http: HttpClient) {}

	checkAuth() {
		return !!localStorage.getItem("user");
	}

	getCountries(): Observable<fromModels.Country[]> {
		return this._http.get<fromModels.Country[]>(
			`${environment.baseUrl}/store/countries`
		);
	}

	getCities(id): Observable<fromModels.City[]> {
		return this._http.get<fromModels.City[]>(
			`${environment.baseUrl}/store/cities?id=${id}`
		);
	}

	getStates(id): Observable<fromModels.State[]> {
		return this._http.get<fromModels.State[]>(
			`${environment.baseUrl}/store/states?id=${id}`
		);
	}

	populate(...args): Observable<{ [key: string]: fromModels.Store[] }> {
		if (!!this._store) {
			return of(this._store);
		} else {
			return this._http
				.get(`${environment.baseUrl}/store`)
				.pipe(map((item: fromModels.Store) => this.format(item, args)));
		}
	}

	format(item, args) {
		const model: { [key: string]: fromModels.Store[] } = {};

		args.forEach(key => {
			model[key] = item.filter(i => i.MasterAttr === key);
		});
		this._store = model;

		return model;
	}
}
