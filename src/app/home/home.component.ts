import { Component } from "@angular/core";

@Component({
	selector: "app-home",
	templateUrl: "home.component.html"
})
export class HomeComponent {
	view: string = "mobile";
	constructor() {}

	toggle() {
		setTimeout(_ => (this.view = "desktop"), 2000);
	}
}
