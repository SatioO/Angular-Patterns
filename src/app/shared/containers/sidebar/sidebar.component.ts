import { environment } from "@env/environment";
import { Component, ChangeDetectionStrategy } from "@angular/core";
// services
import * as fromStore from "../../services";

@Component({
	selector: "sidebar-app",
	templateUrl: "sidebar.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideBarComponent {
	user: any = {};
	imageUrl: string;

	constructor(private _store: fromStore.StoreService) {
		this.user = this._store.getUser();
		this.imageUrl = `${environment.baseUrl}/images/${this.user.Emp_Name}${
			this.user.Emp_Surname
		}/${this.user.Emp_Pic_Upload}`;
	}
}
