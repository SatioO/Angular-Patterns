import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@env/environment";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

import * as fromModels from "../models";

@Injectable()
export class Business_PartnerService {
	constructor(private _http: HttpClient) {}

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
}
