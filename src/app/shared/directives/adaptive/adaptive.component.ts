import {
	Directive,
	Input,
	OnInit,
	TemplateRef,
	ViewContainerRef,
	NgZone
} from "@angular/core";
// rxjs
import { Subject } from "rxjs/Subject";

@Directive({
	selector: "[layout]"
})
export class AdaptiveDirective implements OnInit {
	@Input("layout") layout: string;

	private media$ = new Subject();
	private media_query: MediaQueryList;

	constructor(
		private templateRef: TemplateRef<any>,
		private viewContainer: ViewContainerRef,
		private zone: NgZone
	) {}

	ngOnInit() {
		this.zone.runOutsideAngular(() => {
			this.media_query = window.matchMedia("(max-width: 480px)");
			this.media_query.addListener(this.handleMediaChange.bind(this));
		});

		this.media$.subscribe(query => {
			this.viewContainer.clear();

			if (this.layout === query) {
				this.zone.run(() => {
					this.viewContainer.createEmbeddedView(this.templateRef);
				});
			}
		});

		if (Boolean(navigator.userAgent.match(/iPad|iPhone|Android/i))) {
			this.media$.next("mobile");
		} else {
			this.media$.next("desktop");
		}
	}

	ngOnDestroy() {
		this.media_query.removeListener(this.handleMediaChange.bind(this));
	}

	handleMediaChange(event) {
		event.preventDefault();
		event.matches
			? this.media$.next("mobile")
			: this.media$.next("desktop");
	}
}
