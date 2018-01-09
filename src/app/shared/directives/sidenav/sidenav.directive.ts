import { Directive, HostListener, Renderer, ElementRef } from "@angular/core";

@Directive({
	selector: "[side-nav]"
})
export class SideNavDirective {
	constructor(private renderer: Renderer, private el: ElementRef) {}

	// Event listeners for element hosting
	// the directive
	@HostListener("click", ["$event"])
	onClick(event) {
		let openedItems: NodeListOf<Element> = document.querySelectorAll(".in");
		let singleItem: Element = document.querySelector(
			"li.single_navigation_li.active"
		);

		if (!event.target.classList.contains("route")) {
			if (!this.el.nativeElement.classList.contains("active")) {
				this.renderer.setElementClass(
					this.el.nativeElement,
					"active",
					true
				);
				if (
					!this.el.nativeElement.classList.contains(
						"single_navigation_li"
					)
				) {
					this.renderer.setElementClass(
						this.el.nativeElement.children[1],
						"in",
						true
					);
				}
			} else {
				this.renderer.setElementClass(
					this.el.nativeElement,
					"active",
					false
				);
				if (
					!this.el.nativeElement.classList.contains(
						"single_navigation_li"
					)
				) {
					this.renderer.setElementClass(
						this.el.nativeElement.children[1],
						"in",
						false
					);
				}
			}
		}

		if (
			event.target.classList.value !== "route" &&
			!this.el.nativeElement.classList.contains("single_navigation_li")
		) {
			if (singleItem) {
				singleItem.classList.remove("active");
			}
			for (var l = 0; l < openedItems.length; l++) {
				openedItems[l].classList.remove("in");
				openedItems[l].parentElement.classList.remove("active");
			}
		} else if (
			this.el.nativeElement.classList.contains("single_navigation_li")
		) {
			for (var l = 0; l < openedItems.length; l++) {
				openedItems[l].classList.remove("in");
				openedItems[l].parentElement.classList.remove("active");
			}
		}
	}
}
