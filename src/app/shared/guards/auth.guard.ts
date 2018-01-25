import { Injectable } from "@angular/core";
import { CanActivate, Router, CanLoad } from "@angular/router";
import { StoreService } from "../services";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private _store: StoreService, private _router: Router) {}

	canActivate(): boolean {
		return this.checkAuth();
	}

	canLoad(): boolean {
		return this.checkAuth();
	}

	checkAuth() {
		if (!!this._store.checkAuth()) {
			return true;
		}

		this._router.navigate(["login"]);
		return false;
	}
}
