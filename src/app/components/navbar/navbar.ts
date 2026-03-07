import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '../../../components/ui/button/src';
import { LogoComponent } from "../logo/Logo";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ...HlmButtonImports, LogoComponent],
  templateUrl: './navbar.html',
})
export class Navbar {}
