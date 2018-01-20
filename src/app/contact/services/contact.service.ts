import { environment } from "@env/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable } from "rxjs/Observable";
// models
import * as fromModels from "../models";
import { map } from "rxjs/operators";

@Injectable()
export class ContactService {
	contacts: Observable<fromModels.Contact[]>;
	contact: fromModels.Contact;

	constructor(private _http: HttpClient) {}

	getContacts(): Observable<fromModels.Contact[]> {
		return this._http
			.get<fromModels.Contact[]>(`${environment.baseUrl}/contact`)
			.pipe(map(employees => this.normalizeEntity(employees)));
	}

	getCompanies(): Observable<fromModels.Company[]> {
		const body = {
			fields: "BM_No, BM_Company_Name, BM_Department"
		};

		return this._http.post<fromModels.Company[]>(
			`${environment.baseUrl}/company/list`,
			body
		);
	}

	getEmployees(): Observable<Array<string>> {
		return this._http
			.get<fromModels.Employee[]>(`${environment.baseUrl}/employee`)
			.pipe(
				map(employees =>
					employees.map(
						employee =>
							employee.Emp_Name + " " + employee.Emp_Surname
					)
				)
			);
	}

	create(createcontact) {
		return this._http.post(`${environment.baseUrl}/create`, createcontact);
	}

	normalizeEntity(contacts) {
		return contacts.reduce(
			(
				entities: { [id: number]: fromModels.Contact },
				contact: fromModels.Contact
			) => {
				return {
					...entities,
					[contact.Con_No]: contact
				};
			},
			{}
		);
	}
}
