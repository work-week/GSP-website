import { sendContact, turnstileSiteKey } from '#lib/server/contact.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ platform }) => ({ siteKey: turnstileSiteKey(platform) });

export const actions: Actions = { default: sendContact };
