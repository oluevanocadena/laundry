export class UtilsDomain {
  // Images
  static onImageError(
    event: ErrorEvent,
    defaultImage: string = '/assets/no-image.png'
  ) {
    const target = event.target as HTMLImageElement;
    target.src = defaultImage;
  }

  static clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
  }

  static guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
