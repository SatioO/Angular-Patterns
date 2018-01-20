import { environment } from "@env/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
// models
import * as fromModels from "../models";

@Injectable()
export class ContactService {
	baseUrl: string = `${environment.baseUrl}/contact`;
	contacts: Observable<fromModels.Contact[]>;
	contact: fromModels.Contact;

	constructor(private _http: HttpClient) {}

	public get(): Observable<fromModels.Contact[]> {
		return this._http
			.get<fromModels.Contact[]>(`${this.baseUrl}`)
			.pipe(map(contacts => this.normalize(contacts)));
	}

	public create(contact) {
		return this._http.post(`${this.baseUrl}/create`, contact);
	}

	public update(contact) {
		return this._http.post(`${this.baseUrl}/update`, contact);
	}

	public search(query): Observable<fromModels.Contact[]> {
		return this._http
			.get<fromModels.Contact[]>(`${this.baseUrl}/search?q=${query}`)
			.pipe(map(contacts => this.normalize(contacts)));
	}

	public companies(): Observable<fromModels.Company[]> {
		const body = {
			fields: "BM_No, BM_Company_Name, BM_Department"
		};

		return this._http.post<fromModels.Company[]>(
			`${environment.baseUrl}/company/list`,
			body
		);
	}

	public employees(): Observable<Array<{ name: string; emp_id: string }>> {
		return this._http
			.get<fromModels.Employee[]>(`${environment.baseUrl}/employee`)
			.pipe(
				map(employees =>
					employees.map(employee => {
						return {
							emp_id: employee.Emp_ID,
							name: employee.Emp_Name + " " + employee.Emp_Surname
						};
					})
				)
			);
	}

	private normalize(contacts) {
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
