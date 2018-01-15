import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ToastrService {
	private _tostr = new Subject<{ type: string; message: string }>();

	constructor() {}

	getMessage() {
		return this._tostr;
	}

	info(message: string) {
		this._tostr.next({ type: "info", message: message });
	}
}
