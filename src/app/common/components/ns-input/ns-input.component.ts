import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'ns-input',
  templateUrl: './ns-input.component.html',
  styleUrls: ['./ns-input.component.css']
})

export class NsInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() uppercase = false;
  @Input() required = false;
  @Input() value = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.uppercase ? value.toUpperCase() : value);
  }

}