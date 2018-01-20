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
	constructor(private _store: fromStore.StoreService) {
		this.user = this._store.getUser();
	}
}
