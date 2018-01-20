import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
// models
import * as fromModels from "../../models";

@Component({
	selector: "contact-card",
	templateUrl: "./contact-card.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactCardComponent {
	@Input() contact: fromModels.Contact;
}
