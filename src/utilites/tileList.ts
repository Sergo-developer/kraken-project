export type MapElement = {
  tile: AllTiles;
  prop: AllProps | 'Empty';
  collision: boolean;
};

export type AllTiles = {
  image: string;
  name: string;
};

export type AllProps = {
  image: string;
  name: string;
  isInteractive: boolean;
};

export const allTiles: AllTiles[] = [
  {
    image: '',
    name: 'Empty',
  },
  {
    image: '/sprites/tiles/metalFloor.png',
    name: 'Metal floor',
  },
  {
    image: '/sprites/tiles/grassMono.png',
    name: 'Pale grass',
  },
  {
    image: '/sprites/tiles/grass.png',
    name: 'Grass',
  },
  {
    image: '/sprites/tiles/plate.png',
    name: 'Plate',
  },
  {
    image: '/sprites/tiles/wall.png',
    name: 'Wall',
  },
  {
    image: '/sprites/tiles/pillar.png',
    name: 'Pillar',
  },
];

export const allProps: AllProps[] = [
  {
    image: '',
    name: 'Empty',
    isInteractive: false,
  },
  {
    image: '/sprites/props/randomProp.png',
    name: 'Random props',
    isInteractive: true,
  },
  {
    image: '/sprites/characters/char0.png',
    name: 'player',
    isInteractive: false,
  },
  {
    image: '/sprites/props/chest.png',
    name: 'Chest',
    isInteractive: true,
  },
  {
    image: '/sprites/props/glass.png',
    name: 'Glass',
    isInteractive: false,
  },
  {
    image: '/sprites/props/warningSign.png',
    name: 'Warning sign',
    isInteractive: false,
  },
  {
    image: '/sprites/props/deadBush.png',
    name: 'dead Bush 1',
    isInteractive: false,
  },
  {
    image: '/sprites/props/deadBush2.png',
    name: 'dead Bush 2',
    isInteractive: false,
  },
  {
    image: '/sprites/props/deadBush3.png',
    name: 'dead Bush 3',
    isInteractive: false,
  },
];
