import { handler } from '../netlify/functions/session.mjs';
import { runNetlifyAdapter } from './_adapter.mjs';

export default async function (req, res) {
  return runNetlifyAdapter(handler, req, res);
}
