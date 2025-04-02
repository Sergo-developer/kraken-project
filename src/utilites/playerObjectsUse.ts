interface PlayerUseStore {
  [key: string]: () => boolean;
}

export const onPlayerUseStore: PlayerUseStore = {
  Chest: () => {
    alert('it`s works!');
    return true;
  },
  'red door': () => {
    alert('it`s red door!');
    return true;
  },
};
