const g = globalThis as any;

if (!g.requestAnimationFrame) {
    g.requestAnimationFrame = function(callback: FrameRequestCallback): number {
        return setTimeout(() => callback(Date.now()), 0) as unknown as number;
    };
}

if (!g.cancelAnimationFrame) {
    g.cancelAnimationFrame = function(handle: number): void {
        clearTimeout(handle);
    };
}

if (!g.window) {
    g.window = g;
}

if (!g.document) {
    g.document = {
        createElement: () => ({}),
        // Otros métodos que puedas necesitar
    };
}