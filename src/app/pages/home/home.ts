import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '../../../components/ui/button/src';

@Component({
  selector: 'app-home',
  imports: [NgOptimizedImage, RouterLink, ...HlmButtonImports],
  templateUrl: './home.html',
})
export class Home {}
