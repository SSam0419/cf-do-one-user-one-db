/**
 * CORS helper function to add CORS headers to responses
 */
export function addCorsHeaders(response: Response, request: Request): Response {
	const origin = request.headers.get('Origin');
	const newHeaders = new Headers(response.headers);

	// Allow all origins by default, or configure specific origins
	if (origin) {
		newHeaders.set('Access-Control-Allow-Origin', origin);
	}
	newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	newHeaders.set('Access-Control-Allow-Credentials', 'true');
	newHeaders.set('Access-Control-Max-Age', '86400'); // 24 hours

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: newHeaders,
	});
}

/**
 * Handle OPTIONS preflight requests
 */
export function handleOptions(request: Request): Response {
	const response = new Response(null, { status: 204 });
	return addCorsHeaders(response, request);
}
