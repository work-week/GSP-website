// Contact details shown across the site. One name, address and phone everywhere.
export const site = {
	name: 'Global Shipping Partners, LLC',
	shortName: 'Global Shipping Partners',
	url: 'https://gspforwarding.com',
	phone: { display: '201.351.2453', tel: '+12013512453' },
	founded: 2011,
	offices: [
		{
			city: 'Fort Lee, New Jersey',
			street: '1 Bridge Plaza North, Suite 675',
			locality: 'Fort Lee',
			region: 'NJ',
			postalCode: '07024',
			phone: { display: '201.351.2453', tel: '+12013512453' }
		},
		{
			city: 'Schaumburg, Illinois',
			street: '10 N. Martingale Road, Suite 400',
			locality: 'Schaumburg',
			region: 'IL',
			postalCode: '60173',
			phone: { display: '800.419.1601', tel: '+18004191601' }
		}
	]
} as const;

export const nav = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/resources', label: 'Resources' },
	{ href: '/contact', label: 'Contact' }
] as const;
