import { environment } from "@env/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
// services
import * as fromModels from "../models";

@Injectable()
export class AuthService {
	constructor(private _http: HttpClient) {}

	login(user: fromModels.User): Observable<fromModels.User> {
		return this._http
			.post<fromModels.User>(`${environment.baseUrl}/auth/login`, user)
			.pipe(catchError((err: any) => Observable.throw(err)));
	}

	saveInfo(data) {
		localStorage.setItem("user", JSON.stringify(data));
	}

	getToken() {
		return JSON.parse(localStorage.getItem("user")).Token;
	}
}
