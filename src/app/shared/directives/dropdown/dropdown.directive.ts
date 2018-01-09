import { Directive, HostListener, ElementRef } from "@angular/core";

@Directive({
	selector: "[dropdown]"
})
export class DropDownDirective {
	constructor(private el: ElementRef) {}

	@HostListener("click")
	onClick() {
		let openedItems: NodeListOf<Element> = document.querySelectorAll(
			".opennav"
		);
		this.el.nativeElement.classList.toggle("open");
		this.el.nativeElement.classList.toggle("opennav");

		for (var l = 0; l < openedItems.length; l++) {
			openedItems[l].classList.remove("open");
			openedItems[l].classList.remove("opennav");
		}
	}
}
