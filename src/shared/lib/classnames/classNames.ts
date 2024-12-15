export type Mods = Record<string, boolean | string | undefined>

export function classNames(
	cls: string,
	mods: Mods = {},
	additional: (string | undefined)[] = [],
): string {
	const classes: string[] = [cls, ...additional.filter(Boolean)];

	for (const [className, value] of Object.entries(mods)) {
		if (value) {
			if (typeof value === 'string') {
				classes.push(value);
			} else {
				classes.push(className);
			}
		}
	}

	return classes.join(' ');
}