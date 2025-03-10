type Reputation = { name: string; merchantItemsIndexes: number[] };
type SubLocationsTypes = 'open' | 'close' | 'dungeon';
export type SubLocations = {
  type: SubLocationsTypes;
  name: string;
  map: string;
  levelMin: number;
  levelMax: number;
};

export interface AllLocations {
  name: string;
  description: string;
  icon: string;
  background: string;
  levelMin: number;
  levelMax: number;
  reputation: Reputation[];
  subLocations: SubLocations[];
}

export const allLocations: Record<string, AllLocations> = {
  'Mayda-3': {
    name: 'Mayda-3',
    description:
      'Science city built a couple hundred years ago, the most technologically advanced city on the other side of the asteroid belt, but the wars and the collapse of the Soviet Union left it to be plundered by especially adventurous representatives of our species.',
    icon: '/sprites/locations/kraken11-icon.png',
    background: '/sprites/locations/bg1.png',
    levelMin: 1,
    levelMax: 10,
    reputation: [
      { name: 'loh', merchantItemsIndexes: [0, 1, 2] },
      { name: 'crutoi', merchantItemsIndexes: [5, 6, 7] },
      { name: 'something', merchantItemsIndexes: [7, 8, 7] },
    ],
    subLocations: [
      {
        type: 'open',
        name: 'Hangar',
        levelMin: 1,
        levelMax: 5,
        map: '/maps/hangar.json',
      },
    ],
  },
  Greenhouse: {
    name: 'Greenhouse',
    description:
      'The largest agronomic complex on Titan, becoming a major source of food after Earth cut off its supply. Despite the damage, the complex continues to feed the small population of the City by the Kraken mare.',
    icon: '/sprites/locations/greenhouse-icon.png',
    background: '/sprites/locations/bg2.png',
    levelMin: 1,
    levelMax: 10,
    reputation: [
      { name: 'loh', merchantItemsIndexes: [0, 1, 2] },
      { name: 'crutoi', merchantItemsIndexes: [6, 4, 3] },
      { name: 'something', merchantItemsIndexes: [8, 9, 7] },
    ],
    subLocations: [
      {
        type: 'open',
        name: 'pale halls',
        levelMin: 1,
        levelMax: 5,
        map: '/maps/paleHalls.json',
      },
    ],
  },
};
