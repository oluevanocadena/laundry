import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CapitalizationPipe, CapitalizeFirstLetterPipe } from '@pipes/capitalization.pipe';
import { DateFormatPipe } from '@pipes/date.format.pipe';
import { FilenameFromUrlPipe } from '@pipes/file.name.from.url.pipe';
import { StringJoinPipe } from '@pipes/join.pipe';
import { NumeralFormatPipe } from '@pipes/numeral.pipe';
import { SafeHtmlPipe } from '@pipes/safe.html.pipe';
import { TrimPipe } from '@pipes/trim.pipe';

// Importa otros pipes personalizados aquí

const pipes = [
  SafeHtmlPipe,
  DateFormatPipe,
  NumeralFormatPipe,
  StringJoinPipe,
  CapitalizationPipe,
  TrimPipe,
  CapitalizeFirstLetterPipe,
  FilenameFromUrlPipe,
];

@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes,
})
export class PipesModule {}
