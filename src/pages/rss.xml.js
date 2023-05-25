import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function get(context) {
	const linkcasts = await getCollection('linkcasts');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: linkcasts.map((linkcast) => ({
			title: linkcast.data?.title,
			pubDate: linkcast.data?.date,
			description: linkcast.data?.description,
			link: `/newscasts/${linkcast.slug}/`,
		})),
	});
}
