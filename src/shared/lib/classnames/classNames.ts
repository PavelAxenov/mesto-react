export type Mods = Record<string, boolean | string | undefined>

export function classNames(
	cls: string,
	mods: Mods = {},
	additional: (string | undefined)[] = [],
): string {
	const classes: string[] = [cls, ...additional.filter(Boolean)];

	for (const [className, value] of Object.entries(mods)) {
		if (value) {
			// Type guard to handle string values correctly
			if (typeof value === 'string') {
				classes.push(value);
			} else {
				classes.push(className); //Boolean values use the className as the class
			}
		}
	}

	return classes.join(' ');
}