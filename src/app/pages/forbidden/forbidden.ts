import { Component , ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink, HlmButtonImports],
  templateUrl: './forbidden.html',
})
export class Forbidden {}
