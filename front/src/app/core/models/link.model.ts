import { NavLink } from "../../design-system/navigation-bar/navigation-bar.component";

/**
 * Interface representing a link in the application
 */
export interface Link {
	title: string;
	href: string;
}

/**
 * Helper functions for Link model
 */
export const LinkHelpers = {
	/**
	 * Converts a Link to a NavLink format
	 * @param link The Link to convert
	 * @returns NavLink format
	 */
	toNavLink(link: Link): NavLink {
		return {
			path: link.href,
			label: link.title,
		};
	},

	/**
	 * Converts an array of Links to NavLinks
	 * @param links Array of Links to convert
	 * @returns Array of NavLinks
	 */
	toNavLinks(links: Link[]): NavLink[] {
		return links.map((link) => LinkHelpers.toNavLink(link));
	},
};
