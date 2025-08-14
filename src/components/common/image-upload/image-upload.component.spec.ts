import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ImageUploadComponent } from "./image-upload.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ImageUploadComponent", () => {

  let fixture: ComponentFixture<ImageUploadComponent>;
  let component: ImageUploadComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ImageUploadComponent]
    });

    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
