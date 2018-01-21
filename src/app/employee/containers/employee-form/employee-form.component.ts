import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

// rxjs
import { Observable } from "rxjs/Observable";
import { share } from "rxjs/operators";
// shared
import * as fromShared from "../../../shared";
// services
import * as fromServices from "../../services";
// models
import * as fromModels from "../../models";

@Component({
	selector: "employee-form",
	templateUrl: "./employee-form.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
	@Input() data: { [key: string]: string };
	@Input() viewmode: boolean = false;

	store$: Observable<{ [key: string]: fromShared.Store[] }>;

	countries$: Observable<fromShared.Country[]>;
	states$: Observable<fromShared.State[]>;
	cities$: Observable<fromShared.City[]>;

	tabs: fromModels.Tabs = {
		personal: true,
		contact: false,
		family: false,
		document: false
	};

	payload: { [key: string]: object } = {};
	final_payload = { employee: null, photos: null };
	editmode: boolean = false;

	constructor(
		private _store: fromShared.StoreService,
		private _employee: fromServices.EmployeeService,
		private _router: Router,
		private _activated: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.store$ = this._store.populate(
			fromShared.GENDER,
			fromShared.BLOOD_GROUP,
			fromShared.TITLE,
			fromShared.MARITAL_STATUS,
			fromShared.RELATIONSHIP
		);

		this.countries$ = this._store.getCountries();

		if (!!this.data) {
			this.states$ = this._store.getStates(this.data.Emp_Country);
			this.cities$ = this._store.getCities(this.data.Emp_State);
		}
	}

	handleTabs(event, form): void {
		if (!!event) {
			event.preventDefault();
		}

		if (!this.viewmode && form.status !== "VALID") {
			return;
		}

		this.tabs = {
			personal: false,
			contact: false,
			family: false,
			document: false
		};

		if (!form.back) {
			this.payload[form.name] = form.values;

			if (!!form.submit) {
				this.handleSubmit();
				this._employee.employees = null;
			}
		}

		this.tabs[form.name] = true;
	}

	handleToggle(event): void {
		if (event.type === "country") {
			this.states$ = this._store.getStates(event.value);
		} else if (event.type === "states") {
			this.cities$ = this._store.getCities(event.value);
		}
	}

	handleFile($event) {
		const formData = new FormData();
		formData.append("photos", $event, $event.name);
		this.final_payload.photos = formData;
	}

	handleSubmit() {
		let final = {};

		for (let i in this.payload) {
			final = { ...final, ...this.payload[i] };
		}

		final["Emp_ID"] = `EMP-${Math.random()
			.toString()
			.substring(0, 8)}`;
		final["Emp_Status"] = "A";
		final["UpdatedBy"] = this._store.getUser()["Emp_ID"];
		final["Emp_Delete_Flag"] = "N";
		if (this.editmode) {
			final["Emp_ID"] = this._activated.snapshot.params.id;
			this.final_payload.employee = final;
			if (!!this.final_payload.photos) {
				this._employee.upload(this.final_payload.photos).subscribe(
					data => {
						this._employee.update(this.final_payload).subscribe(
							data => {
								alertify
									.logPosition("bottom right")
									.maxLogItems(1)
									.success("Employee created successfully.");

								this._router.navigate(["/employee/view"]);
							},
							error => {
								alertify
									.logPosition("bottom right")
									.maxLogItems(1)
									.error("Something Went Wrong.");

								this._router.navigate(["/employee/view"]);
							}
						);
					},
					error => {
						alertify
							.logPosition("bottom right")
							.maxLogItems(1)
							.success("Image uploading failed.");
					}
				);
			} else {
				this._employee.update(this.final_payload).subscribe(
					data => {
						alertify
							.logPosition("bottom right")
							.maxLogItems(1)
							.success("Employee created successfully.");

						this._router.navigate(["/employee/view"]);
					},
					error => {
						alertify
							.logPosition("bottom right")
							.maxLogItems(1)
							.error("Something Went Wrong.");

						this._router.navigate(["/employee/view"]);
					}
				);
			}
		} else {
			final["CreatedBy"] = this._store.getUser()["Emp_ID"];
			this.final_payload.employee = final;
			this._employee.upload(this.final_payload.photos).subscribe(
				data => {
					this._employee.saveEmployees(this.final_payload).subscribe(
						data => {
							alertify
								.logPosition("bottom right")
								.maxLogItems(1)
								.success("Employee created successfully.");

							this._router.navigate(["/employee/view"]);
						},
						error => {
							alertify
								.logPosition("bottom right")
								.maxLogItems(1)
								.error("Something Went Wrong.");

							this._router.navigate(["/employee/view"]);
						}
					);
				},
				error => {
					alertify
						.logPosition("bottom right")
						.maxLogItems(1)
						.success("Image uploading failed.");
				}
			);
		}
	}

	handleEdit() {
		this.viewmode = false;
		this.editmode = true;
		this.tabs = {
			personal: true,
			contact: false,
			family: false,
			document: false
		};
	}
}
