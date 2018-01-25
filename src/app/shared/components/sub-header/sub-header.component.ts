import {
	Component,
	OnInit,
	Input,
	Output,
	ChangeDetectionStrategy,
	EventEmitter
} from "@angular/core";

import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
	selector: "sub-header",
	templateUrl: "./sub-header.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubHeaderComponent implements OnInit {
	@Input() title: string;
	@Output() search: EventEmitter<string> = new EventEmitter<string>();

	searchForm: FormGroup;

	constructor(private _fb: FormBuilder) {
		this.searchForm = this._fb.group({
			search: new FormControl("", [])
		});
	}

	ngOnInit(): void {
		this.searchForm.valueChanges
			.pipe(debounceTime(500), distinctUntilChanged())
			.subscribe((output: { search: string }) =>
				this.search.emit(output.search)
			);
	}
}
