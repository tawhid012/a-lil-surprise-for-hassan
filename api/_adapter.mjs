export async function runNetlifyAdapter(handler, req, res) {
  let body = '';
  if (req.body !== undefined && req.body !== null) {
    body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  } else if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    body = Buffer.concat(chunks).toString('utf8');
  }

  const queryStringParameters = {};
  if (req.query && typeof req.query === 'object') {
    for (const [k, v] of Object.entries(req.query)) {
      queryStringParameters[k] = Array.isArray(v) ? v[0] : String(v);
    }
  }

  const result = await handler({
    httpMethod: req.method,
    headers: req.headers || {},
    queryStringParameters,
    body
  });

  const headers = result.headers || {};
  for (const [key, val] of Object.entries(headers)) {
    if (val !== undefined) res.setHeader(key, val);
  }

  res.status(result.statusCode || 200);
  if (result.isBase64Encoded) {
    res.send(Buffer.from(result.body || '', 'base64'));
  } else {
    res.send(result.body || '');
  }
}
