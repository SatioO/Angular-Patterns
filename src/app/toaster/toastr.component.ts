import { Component } from "@angular/core";
import { ToastrService } from "./toastr.service";

@Component({
	selector: "toastr",
	template: `
        <div id="demo-toast-example" class="toastr-js-snackbar toastr-snackbar" 
        [ngClass]="{'toastr-snackbar--active': message.length > 0}">
            <div class="toastr-snackbar__text">{{message}}</div>
        </div>
    `,
	styleUrls: ["toastr.component.scss"]
})
export class ToastrComponent {
	message: string = "";
	snackbar;

	constructor(private _toast: ToastrService) {
		this._toast.getMessage().subscribe(data => {
			this.message = data.message;
		});
	}
}
