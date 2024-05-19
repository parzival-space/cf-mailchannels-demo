import { Router, withContent } from 'itty-router';
import { sendMail } from "./mail";

const router = Router();

router.post('/submit', withContent, async req => {
  return await sendMail(
    req.content.from,
    req.content.to,
    req.content.subject,
    req.content.content
  );
})

router.all('*', () => new Response("", { status: 404 }));

export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return await router.fetch(request);
	},
};
