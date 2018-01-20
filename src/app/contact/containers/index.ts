import { ContactViewComponent } from "./contact-view/contact-view.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";

export const containers: any[] = [
	ContactFormComponent,
	ContactViewComponent,
	ContactDetailComponent
];

export * from "./contact-form/contact-form.component";
export * from "./contact-view/contact-view.component";
export * from "./contact-detail/contact-detail.component";
