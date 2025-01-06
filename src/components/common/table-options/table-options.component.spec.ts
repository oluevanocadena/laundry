import { NO_ERRORS_SCHEMA } from "@angular/core";
import { TableOptionsComponent } from "./table-options.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("TableOptionsComponent", () => {

  let fixture: ComponentFixture<TableOptionsComponent>;
  let component: TableOptionsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [TableOptionsComponent]
    });

    fixture = TestBed.createComponent(TableOptionsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
