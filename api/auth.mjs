import { handler } from '../netlify/functions/auth.mjs';
import { runNetlifyAdapter } from './_adapter.mjs';

export default async function (req, res) {
  return runNetlifyAdapter(handler, req, res);
}
