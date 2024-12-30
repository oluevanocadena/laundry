import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BoardTableCustomerComponent } from "./board-table-customer.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("BoardTableCustomerComponent", () => {

  let fixture: ComponentFixture<BoardTableCustomerComponent>;
  let component: BoardTableCustomerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [BoardTableCustomerComponent]
    });

    fixture = TestBed.createComponent(BoardTableCustomerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
