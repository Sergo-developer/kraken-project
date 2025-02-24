export const quality = {
  common: '#ffffff',
  uncommon: '#00ff15',
  military: '#0033ff',
  classified: '#8e00ff',
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
  count: false | number;
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
    count: 1,
    image: '/sprites/items/nails.png',
    attribute: {
      type: 'junk',
    },
  },
  {
    name: 'Silicone grease',
    description: 'Will make move what should move',
    quality: 'common',
    price: 200,
    isBlocked: false,
    count: 1,
    image: '/sprites/items/grease.png',
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
    count: 1,
    image: '/sprites/items/hammer.png',
    attribute: {
      type: 'junk',
    },
  },
];
