import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ModalColumnsSortComponent } from "@components/common/modal-columns-sort/modal-columns-sort.component";

describe("ModalColumnsSortComponent", () => {

  let fixture: ComponentFixture<ModalColumnsSortComponent>;
  let component: ModalColumnsSortComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ModalColumnsSortComponent]
    });

    fixture = TestBed.createComponent(ModalColumnsSortComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
