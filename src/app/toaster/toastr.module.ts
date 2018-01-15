import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// component
import { ToastrComponent } from "./toastr.component";
// service
import { ToastrService } from "./toastr.service";

@NgModule({
	declarations: [ToastrComponent],
	imports: [CommonModule],
	exports: [ToastrComponent],
	providers: [ToastrService]
})
export class ToastrModule {}
