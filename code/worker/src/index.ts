/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Router } from "itty-router";
import CoffeeCount from './handlers/CoffeeCount';
import NewCoffee from "./handlers/NewCoffee";


export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	COFFEES: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

// Create a new itty-router instance.
const router = Router();

// Define the routes that itty should know about.
// Provide a fallback route so that a requests always gets a response.
// The following response code is a fun implementation for when a page is not found.
// RFC2324, section 2.3.2 dictates the following HTTP status code: 418 -> I'm a Teapot
// https://www.rfc-editor.org/rfc/rfc2324#section-2.3.2
router
	.get('/api/coffee-count', CoffeeCount)
	.post('/api/coffee-count', NewCoffee)
	.get('*', (
		request: Request,
		env: Env,
		ctx: ExecutionContext
	) => new Response('I\'m a Teapot', { status: 418 }));

export default {
	fetch: router.handle
}
