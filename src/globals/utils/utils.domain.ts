export class UtilsDomain {
  // Images
  static onImageError(
    event: ErrorEvent,
    defaultImage: string = '/assets/no-image.png'
  ) {
    const target = event.target as HTMLImageElement;
    target.src = defaultImage;
  }
}
