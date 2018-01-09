import { Directive, HostListener, Renderer, ElementRef } from "@angular/core";

@Directive({
	selector: "[minimiza-sidebar]"
})
export class MinimizeSideNavDirective {
	constructor(private renderer: Renderer, private el: ElementRef) {}

	// Event listeners for element hosting
	// the directive
	@HostListener("click")
	onClick() {
		if (
			!this.el.nativeElement.ownerDocument.body.classList.contains(
				"mini-navbar"
			)
		) {
			this.renderer.setElementClass(
				this.el.nativeElement.ownerDocument.body,
				"mini-navbar",
				true
			);
			document.getElementById("side-menu").style.display = "none";
			setTimeout(function() {
				document.getElementById("side-menu").style.display = "block";
			}, 100);
		} else {
			document.getElementById("side-menu").style.display = "none";
			this.renderer.setElementClass(
				this.el.nativeElement.ownerDocument.body,
				"mini-navbar",
				false
			);
			setTimeout(function() {
				document.getElementById("side-menu").style.display = "block";
			}, 200);
		}
	}
}
