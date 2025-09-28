import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SupportDraftPageComponent } from "./support-draft-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("SupportDraftPageComponent", () => {

  let fixture: ComponentFixture<SupportDraftPageComponent>;
  let component: SupportDraftPageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [SupportDraftPageComponent]
    });

    fixture = TestBed.createComponent(SupportDraftPageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
