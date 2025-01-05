import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  TuiAppearance,
  tuiAppearanceState,
  TuiAutoColorPipe,
  TuiButton,
  TuiDataList,
  TuiDateFormat,
  TuiDialog,
  TuiDropdown,
  TuiGroup,
  TuiIcon,
  TuiPopup,
  TuiRoot,
  TuiTextfield,
} from '@taiga-ui/core';
import {
  TuiAccordion,
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiBlock,
  TuiButtonClose,
  TuiCarousel,
  TuiCheckbox,
  TuiChevron,
  TuiChip,
  TuiCopy,
  TuiDataListDropdownManager,
  TuiDrawer,
  TuiFade,
  TuiPagination,
  TuiPassword,
  TuiRadio,
  TuiSegmented,
  TuiSwitch,
} from '@taiga-ui/kit';
import {
  TuiInputDateModule,
  TuiInputDateMultiModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPhoneModule,
  TuiInputTimeModule,
  TuiMultiSelectModule,
  TuiTextareaModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

@NgModule({
  imports: [
    CommonModule,
    ...TuiAccordion,
    ...TuiCarousel,
    ...TuiDataList,
    ...TuiDropdown,
    ...TuiRadio,
    ...TuiTextfield,
    TuiAppearance,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiBlock,
    TuiButton,
    TuiButtonClose,
    TuiCheckbox,
    TuiChevron,
    TuiChip,
    TuiCopy,
    TuiDataListDropdownManager,
    TuiDateFormat,
    TuiDialog,
    TuiDrawer,
    TuiFade,
    TuiGroup,
    TuiIcon,
    TuiInputDateModule,
    TuiInputDateMultiModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputPhoneModule,
    TuiInputTimeModule,
    TuiMultiSelectModule,
    TuiPagination,
    TuiPassword,
    TuiPopup,
    TuiRoot,
    TuiSegmented,
    TuiSwitch,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
  ],
  exports: [
    TuiRoot,
    ...TuiAccordion,
    ...TuiCarousel,
    ...TuiDataList,
    ...TuiDropdown,
    ...TuiRadio,
    ...TuiTextfield,
    TuiAppearance,
    TuiAutoColorPipe,
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiBlock,
    TuiButton,
    TuiButtonClose,
    TuiCheckbox,
    TuiChevron,
    TuiChip,
    TuiDataListDropdownManager,
    TuiDateFormat,
    TuiDialog,
    TuiDrawer,
    TuiFade,
    TuiGroup,
    TuiIcon,
    TuiInputDateModule,
    TuiInputDateMultiModule,
    TuiInputModule,
    TuiInputNumberModule,
    TuiInputPhoneModule,
    TuiInputTimeModule,
    TuiMultiSelectModule,
    TuiPagination,
    TuiPassword,
    TuiPopup,
    TuiSegmented,
    TuiSwitch,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
  ],
})
export class TUIModule {}
