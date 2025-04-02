export const qualityColor = {
  common: '#ffffff',
  uncommon: '#66ad66',
  military: '#8da0fd',
  classified: '#7a44a4',
  prototype: '#ff0000',
  unique: '#ffcc00',
};

type ItemsQualities = 'common' | 'uncommon' | 'military' | 'classified' | 'prototype' | 'unique';

type WeaponTypes =
  | 'pistol'
  | 'assault rifle'
  | 'submachine gun'
  | 'sniper rifle'
  | 'shotgun'
  | 'machinegun';

type AmmoTypes =
  | '9mm'
  | '5.56mm'
  | '5.45mm'
  | '7.62x39mm'
  | '7.62x54r'
  | '7.62x51mm'
  | '9.39mm'
  | '12.7mm';

type Junk = {
  type: 'junk';
};

type Ammo = {
  type: 'ammo';
};

type Medicine = {
  type: 'medicine';
  healthToRestore: number;
};

type Weapon = {
  type: 'weapon';
  weaponType: WeaponTypes;
  ammo: AmmoTypes;
  shotsCount: number;
  damageMin: number;
  damageMax: number;
  critChance: number;
  missChance: number;
};

type Suit = {
  type: 'suit';
  oxygenCapacity?: number;
  armor?: number;
  agility?: number;
  critChance?: number;
  missChance?: number;
};

type GasTank = {
  type: 'oxygen tank';
  oxygenCapacity: number;
  armor?: number;
  agility?: number;
  critChance?: number;
  missChance?: number;
};

type Tech = {
  type: 'tech';
  oxygenCapacity?: number;
  health?: number;
  armor?: number;
  agility?: number;
  critChance?: number;
  missChance?: number;
};

type Attributes = Junk | Ammo | Medicine | Weapon | Suit | GasTank | Tech;

export type Item = {
  name: string;
  description: string;
  quality: ItemsQualities;
  price: number;
  isBlocked: boolean;
  isStackable: boolean;
  count: number;
  image: string;
  attribute: Attributes;
};

export const allItemsList: Item[] = [
  {
    name: 'Box of nails',
    description: 'A box of nails',
    quality: 'common',
    price: 100,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/nails.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'Oscilloscope',
    description:
      "It used to belong to a research institute, but now it's yours, and even the supervisor won't notice.",
    quality: 'uncommon',
    price: 100,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/oscilloscope.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'Silicone grease',
    description: 'Will make move what should move',
    quality: 'uncommon',
    price: 200,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/grease.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'Military transmitter',
    description: 'A military transmitter that transmits military stuff',
    quality: 'military',
    price: 2500,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/repeater.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'hammer',
    description:
      'In theory it could play a role as a melee weapon, but Im afraid youll get shot before you can hit someone with this hammer.',
    quality: 'common',
    price: 500,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/hammer.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'gigarine',
    description: 'orange',
    quality: 'unique',
    price: 3900,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/gigarine.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'Grachev resonator',
    description:
      "Grachev resonator - the device allows quantum communication without the use of a “quantum transmission mast”. But it works once in a while and with such a terrible lag, so, by God, you'd better find a way to get on the air with the help of a “mast”",
    quality: 'classified',
    price: 99000,
    isBlocked: false,
    isStackable: true,
    count: 1,
    image: '/sprites/items/wierdTech.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'PM',
    description:
      'PM - Makarov`s pistol, legendary and ebeishy nahui sidearm voobshe, 13 amount of ammo make tvoi vrag fucking zdohnuth',
    quality: 'classified',
    price: 99000,
    isBlocked: false,
    isStackable: false,
    count: 1,
    image: '/sprites/items/weapons/PM.png',
    attribute: {
      type: 'weapon',
      weaponType: 'pistol',
      ammo: '9mm',
      shotsCount: 1,
      damageMin: 1,
      damageMax: 2,
      critChance: 10,
      missChance: 23,
    },
  },

  {
    name: 'armor',
    description: 'default suit',
    quality: 'common',
    price: 20,
    isBlocked: false,
    isStackable: false,
    count: 1,
    image: '/sprites/items/suits/SUNCSAS.png',
    attribute: {
      type: 'suit',
      oxygenCapacity: 10,
      armor: 10,
      agility: 10,
      critChance: 10,
      missChance: 10,
    },
  },
];
