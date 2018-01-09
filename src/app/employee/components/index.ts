import { PersonalDetailsComponent } from "./personal-details/personal-details.component";
import { ContactDetailsComponent } from "./contact-details/contact-details.component";
import { FamilyDetailsComponent } from "./family-details/family-details.component";
import { DocumentDetailsComponent } from "./document-details/document-details.component";
import { EmployeeCardComponent } from "./employee-card/employee-card.component";

export const components: any[] = [
	PersonalDetailsComponent,
	ContactDetailsComponent,
	FamilyDetailsComponent,
	DocumentDetailsComponent,
	EmployeeCardComponent
];

export * from "./personal-details/personal-details.component";
export * from "./contact-details/contact-details.component";
export * from "./family-details/family-details.component";
export * from "./document-details/document-details.component";
export * from "./employee-card/employee-card.component";
