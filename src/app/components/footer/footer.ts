import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmSeparatorImports } from '../../../components/ui/separator/src';
import { LogoComponent } from "../logo/Logo";

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ...HlmSeparatorImports, LogoComponent],
  templateUrl: './footer.html',
})
export class Footer {
  readonly year = new Date().getFullYear();
}
