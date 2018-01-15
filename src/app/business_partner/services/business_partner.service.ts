import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import { Country, City, State } from "../models";

@Injectable()
export class Business_PartnerService {
	constructor(private _http: HttpClient) {}

	getCountries(): Observable<Country[]> {
		return this._http
			.get(`${environment.baseUrl}/countries`)
			.pipe(catchError((error: any) => Observable.throw(error.json())));
	}

	getCities(id): Observable<City[]> {
		return this._http
			.get(`${environment.baseUrl}/cities?id=${id}`)
			.pipe(catchError((error: any) => Observable.throw(error.json())));
	}

	getStates(id): Observable<State[]> {
		return this._http
			.get(`${environment.baseUrl}/states?id=${id}`)
			.pipe(catchError((error: any) => Observable.throw(error.json())));
	}
}
