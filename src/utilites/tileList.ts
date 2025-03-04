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
];

export const allProps: AllProps[] = [
  {
    image: '',
    name: 'Empty',
  },
  {
    image: '/sprites/props/randomProp.png',
    name: 'Random props',
  },
  {
    image: '/sprites/characters/char0.png',
    name: 'player',
  },
  {
    image: '/sprites/props/chest.png',
    name: 'Chest',
  },
  {
    image: '/sprites/props/deadBush.png',
    name: 'dead Bush 1',
  },
  {
    image: '/sprites/props/deadBush2.png',
    name: 'dead Bush 2',
  },
  {
    image: '/sprites/props/deadBush3.png',
    name: 'dead Bush 3',
  },
];
