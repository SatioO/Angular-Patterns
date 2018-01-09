import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
	selector: "footer-app",
	templateUrl: "footer.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
	year: Number = new Date().getFullYear();

	constructor() {}
}
