export const SAMPLE_MONSTER = Object.freeze({
	monster_name: 'Sample',
	size: 'L',
	type: { type: 'humanoid', tags: ['any race'] },
	source: 'MM',
	alignment: ['A'],
	ac: [{ ac: 18, from: ['plate armor'] }],
	hp: { average: 192, formula: '16d10 + 96' },
	speed: { walk: 30 },
	str: 22,
	dex: 16,
	con: 24,
	int: 12,
	wis: 18,
	cha: 12,
	name_post_stats: 'Sample',
	save: { dex: '+7', con: '+9', int: '+5' },
	resist: [
		'necrotic',
		{
			resist: ['bludgeoning', 'piercing', 'slashing'],
			note: "from nonmagical attacks that aren't silvered",
		},
	],
	passive: 14,
	languages: ['Common plus two more'],
	cr: '9',
	name_pre_trait: 'Sample',
	trait: [
		{
			name: 'Legendary Resistance (3/Day)',
			entries: ['If the spectator fails a saving throw, it can choose to succeed instead.'],
		},
	],
	name_pre_action: 'Sample',
	action: [
		{
			name: 'Staff',
			entries: [
				'Melee Weapon Attack (+4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage. If the target is a creature other than an undead, it must succeed on a 15 Constitution saving throw or speed is reduced by 10 feet.',
			],
		},
		{
			name: 'Light Crossbow',
			entries: [
				'Ranged Weapon Attack 3 to hit, range 30/120 ft., one target. Hit: 6 (1d8 + 1) piercing damage.',
			],
		},
	],
	page: 93,
	name_pre_spells: 'Sample',
	spellcasting: [
		{
			name: 'Spellcasting',
			headerEntries: [
				'The spectator is a 14th-level spellcaster. Its spellcasting ability is Wisdom (spell save 15, 7 to hit with spell attacks). The spectator has the following cleric spells prepared:',
			],
			spells: {
				0: { spells: ['light', 'sacred flame', 'thaumaturgy'] },
				1: { slots: 4, spells: ['bane', 'cure wounds', 'guiding bolt'] },
				2: { slots: 2, spells: ['hold person', 'spiritual weapon'] },
			},
			ability: 'wis',
		},
	],
})
