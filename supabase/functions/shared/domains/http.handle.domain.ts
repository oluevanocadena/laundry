export class HttpHandleDomain {
  static corsHeaders() {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    };
  }

  static async handlePreflight(req: Request): Promise<Response | null> {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: HttpHandleDomain.corsHeaders() });
    }
    return null;
  }

  static errorResponse(message: string, statusCode = 400): Response {
    return new Response(JSON.stringify({ success: false, error: true, message, status: statusCode }), {
      status: statusCode,
      headers: HttpHandleDomain.corsHeaders(),
    });
  }

  static successResponse(data: any, message = 'OK', statusCode = 200): Response {
    return new Response(JSON.stringify({ success: true, error: false, message, data, status: statusCode }), {
      status: statusCode,
      headers: HttpHandleDomain.corsHeaders(),
    });
  }
}
