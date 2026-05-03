// src/components/ui/otp-input/src/lib/hlm-otp-input.ts

import { Component, ViewChildren, QueryList, ElementRef, inject, signal, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'hlm-otp-input',
  standalone: true,
  imports: [CommonModule, FormsModule, HlmInputImports],
  template: `
    <div class="flex gap-2">
      @for (i of $signal(length()); track i) {
        <input
          #otpInput
          hlmInput
          type="text"
          inputmode="numeric"
          maxlength="1"
          [value]="otp()[i]"
          (input)="onInput($event, i)"
          (keydown)="onKeyDown($event, i)"
          (paste)="onPaste($event)"
          class="w-12 h-12 text-center text-lg font-semibold"
          [attr.aria-label]="'OTP digit ' + (i + 1)"
        />
      }
    </div>
  `,
})
export class HlmOtpInput {
  @ViewChildren('otpInput') inputElements!: QueryList<ElementRef>;

  length = input<number>(6);
  placeholder = input<string>('•');
  otpCompleted = output<string>();

  otp = signal<string[]>([]);

  constructor() {
    effect(() => {
      const len = this.length();
      this.otp.set(Array(len).fill(''));
    });
  }

  $signal(value: number) {
    return Array.from({ length: value }, (_, i) => i);
  }

  onInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');

    if (value.length > 1) {
      input.value = value[0];
    }

    const currentOtp = this.otp();
    currentOtp[index] = input.value;
    this.otp.set([...currentOtp]);

    // Auto-focus to next input if digit is entered
    if (input.value && index < this.length() - 1) {
      setTimeout(() => {
        const nextInput = this.inputElements.toArray()[index + 1];
        if (nextInput) {
          nextInput.nativeElement.focus();
        }
      }, 0);
    }

    // Check if all fields are filled
    if (this.otp().every((digit) => digit !== '')) {
      this.otpCompleted.emit(this.otp().join(''));
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const currentOtp = this.otp();
      currentOtp[index] = '';
      this.otp.set([...currentOtp]);

      // Auto-focus to previous input on backspace
      if (index > 0) {
        const prevInput = this.inputElements.toArray()[index - 1];
        if (prevInput) {
          prevInput.nativeElement.focus();
        }
      }
    }

    // Arrow keys navigation
    if (event.key === 'ArrowLeft' && index > 0) {
      this.inputElements.toArray()[index - 1].nativeElement.focus();
    }
    if (event.key === 'ArrowRight' && index < this.length() - 1) {
      this.inputElements.toArray()[index + 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/[^0-9]/g, '').split('').slice(0, this.length());

    const padded = Array(this.length()).fill('');
    digits.forEach((digit, i) => padded[i] = digit);
    this.otp.set(padded);

    // Focus the first empty field or last field
    const emptyIndex = digits.length < this.length() ? digits.length : this.length() - 1;
    setTimeout(() => {
      const nextInput = this.inputElements.toArray()[emptyIndex];
      if (nextInput) {
        nextInput.nativeElement.focus();
      }
    }, 0);

    if (digits.length === this.length()) {
      this.otpCompleted.emit(digits.join(''));
    }
  }

  // Helper to get OTP value programmatically
  getOtp(): string {
    return this.otp().join('');
  }

  // Helper to clear OTP
  clearOtp(): void {
    this.otp.set(Array(this.length()).fill(''));
    this.inputElements.toArray()[0]?.nativeElement.focus();
  }
}