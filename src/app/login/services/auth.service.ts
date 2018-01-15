import { environment } from "@env/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators/catchError";
// services
import * as fromModels from "../models";
import { ToastrService } from "../../toaster/toastr.service";

@Injectable()
export class AuthService {
	constructor(private _http: HttpClient, private toast: ToastrService) {}

	login(user: fromModels.User): Observable<string> {
		return this._http
			.post<fromModels.User>(`${environment.baseUrl}/login`, user)
			.pipe(
				catchError(error => {
					this.toast.info(error.message);
					return Observable.of(error.message);
				})
			);
	}
}
