import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'image-upload',
  standalone: false,
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
  @Input() accept: 'image/jpeg,image/png' | 'video/*' = 'image/jpeg,image/png';
  @Input() maxSizeMb: number = 5; // 5MB
  @Input() imageUrl: string | null = null;
  @Input() avoidDisplay: boolean = false;
  @Input() disableDelete: boolean = false;
  @Input() busy: boolean = false;

  @Output() onSelected = new EventEmitter<File>();
  @Output() onDelete = new EventEmitter<string>();

  // Estado para el drag & drop
  isDragOver = false;
  file: File | null = null;

  constructor(private nzMessageService: NzMessageService) {}

  /**
   * UI Events
   */

  onSelectedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  /**
   * Drag & Drop Events
   */

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidFileType(file)) {
        this.handleFile(file);
      } else {
        this.showInvalidFileTypeError();
      }
    }
  }

  /**
   * Private Methods
   */

  private handleFile(file: File) {
    // Validar tamaño
    if (file.size > this.maxSizeMb * 1024 * 1024) {
      this.nzMessageService.error(
        `El archivo excede el tamaño máximo permitido de ${this.maxSizeMb}MB`
      );
      return;
    }

    // Validar tipo de archivo
    if (!this.isValidFileType(file)) {
      this.showInvalidFileTypeError();
      return;
    }
    this.file = file;
    console.log('👉🏽 file', file);
    this.onSelected.emit(file);
  }

  private isValidFileType(file: File): boolean {
    const acceptedTypes = this.accept.split(',').map((type) => type.trim());

    return acceptedTypes.some((type) => {
      if (type === 'image/jpeg,image/png') {
        return file.type === 'image/jpeg' || file.type === 'image/png';
      }
      if (type === 'video/*') {
        return file.type.startsWith('video/');
      }
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return (
        file.type === type || file.type.startsWith(type.replace('/*', '/'))
      );
    });
  }

  private showInvalidFileTypeError() {
    const typeMessage =
      this.accept === 'video/*' ? 'videos' : 'imágenes (JPEG, PNG)';

    this.nzMessageService.error(`Solo se permiten archivos de ${typeMessage}`);
  }

  /**
   * UI Events
   */

  delete() {
    this.file = null;
    this.onDelete.emit(this.imageUrl || '');
  }

  /**
   * Getters
   */

  get imageSelected() {
    return (this.file || this.imageUrl) && !this.avoidDisplay ? true : false;
  }

  get imageBase64() {
    if (this.file) {
      return URL.createObjectURL(this.file);
    }
    if (this.imageUrl) {
      return this.imageUrl;
    }
    return null;
  }

  /**
   * Life Cycle
   */

  ngOnInit() {}
}
