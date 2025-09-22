import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { SessionService } from '@bussiness/session/services/session.service';

@Directive({
  selector: '[roleShow]',
  standalone: false,
})
export class RoleShowDirective {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private sessionService = inject(SessionService);

  private hasView = false;

  @Input('roleShow') set roleShow(roles: string | number | (string | number)[]) {
    if (!roles) {
      this.clear();
      return;
    }

    const allowedRoles = Array.isArray(roles) ? roles : roles.toString().split(',');
    const userRoles = this.sessionService.sessionInfo.value?.Roles.map((r: any) => r.RoleId) ?? [];

    const canShow = allowedRoles.includes('*') || userRoles.some((r: any) => allowedRoles.includes(r.toString()));

    if (canShow && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!canShow && this.hasView) {
      this.clear();
    }
  }

  private clear() {
    this.viewContainer.clear();
    this.hasView = false;
  }
}
