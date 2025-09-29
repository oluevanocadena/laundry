import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';

import { NzMessageService } from 'ng-zorro-antd/message';

import { routes } from '@app/routes';

import { UIDefaultTablePagination, UITableConstants } from '@globals/constants/supabase-tables.constants';
import { UITableActions, UITableColumn, UITableFilterBase, UITablePagination } from '@globals/interfaces/ui.interfaces';
import { FacadeBase } from '@globals/types/facade.base';
import { SubjectProp } from '@globals/types/subject.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { StorageService } from '@services/common/storage.service';

import { SessionService } from '@bussiness/session/services/session.service';
import { SupportPageTableColumns } from '@bussiness/support/constants/support.columns.constant';
import { SupportDraftFacade } from '@bussiness/support/controllers/support.draft.facade';
import { SupportTicket } from '@bussiness/support/interfaces/support.interfaces';
import { ISupportModulesRepository } from '@bussiness/support/repository/support.modules.repository';
import { ISupportTicketRepository } from '@bussiness/support/repository/support.repository';
import { UITypeFilterShow } from '@components/common/table-filters/table-filters.component';

@Injectable({
  providedIn: 'root',
})
export class SupportMonitorFacade extends FacadeBase {
  //Flag Management
  showDeleteTicketsModal = false;
  showDisableTicketsModal = false;

  showType: UITypeFilterShow = {
    calendar: false,
    columns: false,
    search: true,
    sort: true,
  };

  tablePagination = new SubjectProp<UITablePagination>(UIDefaultTablePagination);
  tableFilter = new SubjectProp<UITableFilterBase>({
    dateFrom: moment().toDate(),
    dateTo: moment().toDate(),
    select: null,
    search: null,
    sortBy: 'created_At',
    sortOrder: 'asc',
  });
  columns: UITableColumn[] = SupportPageTableColumns;

  actions: UITableActions[] = [
    { label: 'Eliminar', icon: 'delete', appearance: 'danger', action: () => this.openDeleteTicketsModal() },
  ];

  constructor(
    public repo: ISupportTicketRepository,
    public modulesRepo: ISupportModulesRepository,
    public draftFacade: SupportDraftFacade,
    public router: Router,
    public sessionService: SessionService,
    public storageService: StorageService,
    private nzMessageService: NzMessageService,
  ) {
    super(repo);
  }

  override initialize() {
    super.initialize();
    this.columns = this.storageService.get('SUPPORT_COLUMNS') || this.getDefaultColumns();
    this.fetchTickets();
    this.bindEvents();
  }

  bindEvents() {
    this.sessionService.sessionInfo.onChange((session) => {
      this.fetchTickets();
    });
  }

  submitForm() {}

  clearState() {
    this.repo.supportTicketsPaged.value = null;
  }

  /**
   * APi
   */

  fetchTickets() {
    const pagination = this.tablePagination.value;
    const starDate = moment(this.tableFilter.value?.dateFrom).format('YYYY-MM-DD');
    const endDate = moment(this.tableFilter.value?.dateTo).format('YYYY-MM-DD');

    this.repo.getPaged({
      page: pagination?.page ?? UITableConstants.DefaultPage,
      pageSize: pagination?.pageSize ?? UITableConstants.DefaultPageSize,
      dateFrom: starDate!,
      dateTo: endDate!,
      select: this.tableFilter.value?.select ?? null,
      search: this.tableFilter.value?.search ?? null,
      sortBy: this.tableFilter.value?.sortBy ?? null,
      sortOrder: this.tableFilter.value?.sortOrder ?? 'asc',
    });
  }

  /**
   * UI Events
   */

  onColumnsChange(columns: UITableColumn[]) {
    console.log('👉🏽 save columns', columns);
    this.storageService.set('SUPPORT_COLUMNS', columns);
    this.columns = UtilsDomain.clone(columns);
  }

  onFiltersChange(filter: UITableFilterBase) {
    this.tableFilter.value = filter as UITableFilterBase;
    this.fetchTickets();
  }

  onTablePaginationChange(filter: UITablePagination) {
    this.tablePagination.value = filter;
    this.fetchTickets();
  }

  onTicketClick(ticket: SupportTicket) {
    this.draftFacade.selectedTicket.value = ticket;
    this.router.navigate([routes.SupportDraft]);
  }

  onNewTicket() {
    this.draftFacade.clearState();
    this.router.navigate([routes.SupportDraft]);
    console.log('New ticket');
  }

  onDeleteTickets() {
    const ids = this.selectedRows.map((ticket) => ticket.id!.toString());
    this.repo.deleteMany(ids).then((response) => {
      if (response.success) {
        this.nzMessageService.success('Tickets eliminados');
        this.fetchTickets();
      } else {
        this.nzMessageService.error('Ocurrió un error al eliminar los tickets');
      }
      this.showDeleteTicketsModal = false;
    });
  }

  openDeleteTicketsModal() {
    this.showDeleteTicketsModal = true;
  }

  get selectedRows() {
    return this.repo.supportTicketsPaged.value?.data?.filter((ticket) => (ticket as any).Checked) ?? [];
  }

  private getDefaultColumns(): UITableColumn[] {
    return [
      { key: 'Title', label: 'Título', sortable: true, width: '200px', selected: true },
      { key: 'Description', label: 'Descripción', sortable: true, width: '300px', selected: true },
      { key: 'StatusId', label: 'Estado', sortable: true, width: '120px', selected: true },
      { key: 'Priority', label: 'Prioridad', sortable: true, width: '120px', selected: true },
      { key: 'created_At', label: 'Fecha de Creación', sortable: true, width: '150px', selected: true },
      { key: 'updated_At', label: 'Última Actualización', sortable: true, width: '150px', selected: true },
    ];
  }
}
