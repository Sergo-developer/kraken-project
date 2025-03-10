<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import PlayerBars from '@/components/PlayerBars.vue';
import useLocationStore from '@/stores/locationStore.ts';
import type { MapElement } from '@/utilites/tileList.ts';

const { currentSubLocation } = useLocationStore();
const pixelMap = ref<MapElement[][]>([]);
const characterPosition = ref({ x: 0, y: 0 });
const characterRotation = ref('down');
const gameCamera = ref<HTMLDivElement>();

type Directions = 'left' | 'right' | 'up' | 'down';
const Directions = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
};

// Функция загрузки карты из JSON
const loadMapFromJSON = async () => {
  try {
    const response = await fetch(currentSubLocation?.map ?? '');
    const mapData = await response.json();

    console.log('Загруженная карта:', mapData); // <-- Проверяем структуру JSON

    if (!mapData || !Array.isArray(mapData)) {
      throw new Error('Ошибка: `tiles` отсутствует или имеет неверный формат');
    }

    pixelMap.value = mapData;

    for (let y = 0; y < pixelMap.value.length; y++) {
      for (let x = 0; x < pixelMap.value[y].length; x++) {
        if (pixelMap.value[y][x]?.prop?.name === 'player') {
          characterPosition.value = { x, y };
          break;
        }
      }
    }

    updateCamera();
  } catch (error) {
    console.error('Ошибка загрузки карты:', error);
  }
};

// Перемещение персонажа
const characterMove = (direction: Directions) => {
  const moves = {
    left: { x: 0, y: -1 },
    right: { x: 0, y: 1 },
    up: { x: -1, y: 0 },
    down: { x: 1, y: 0 },
  };

  const move = moves[direction];
  characterRotation.value = direction;

  if (move) {
    const newX = characterPosition.value.x + move.x;
    const newY = characterPosition.value.y + move.y;

    // Проверяем, есть ли столкновение (`collision === false` значит можно двигаться)
    if (
      pixelMap.value[newY] &&
      pixelMap.value[newY][newX] &&
      !pixelMap.value[newY][newX].collision
    ) {
      // Перемещаем игрока
      pixelMap.value[characterPosition.value.y][characterPosition.value.x].prop = {
        name: 'Empty',
        image: '',
      };
      characterPosition.value = { x: newX, y: newY };
      pixelMap.value[newY][newX].prop = { name: 'player', image: '/sprites/characters/char0.png' };

      updateCamera();
    }
  }
};

// Обновление камеры
const updateCamera = () => {
  if (gameCamera.value) {
    const tileSize = 128;
    const centerX = 700 / 2 - tileSize / 2;
    const centerY = 700 / 2 - tileSize / 2;
    gameCamera.value.style.transform = `translate(${centerX - characterPosition.value.y * tileSize}px, ${centerY - characterPosition.value.x * tileSize}px)`;
  }
};

// Проверяем, рядом ли игрок
const isPlayerNear = (x: number, y: number) => {
  return (
    (characterPosition.value.x === x && characterPosition.value.y === y + 1) ||
    (characterPosition.value.x === x && characterPosition.value.y === y - 1) ||
    (characterPosition.value.y === y && characterPosition.value.x === x + 1) ||
    (characterPosition.value.y === y && characterPosition.value.x === x - 1)
  );
};

// Обработка нажатий клавиш
const handleKeydown = (event: KeyboardEvent) => {
  if (Directions[event.key]) {
    characterMove(Directions[event.key]);
  }
};

onMounted(() => {
  loadMapFromJSON();
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});

watch(characterPosition, updateCamera);
</script>

<template>
  <div class="game-block">
    <div ref="gameCamera" class="game-camera">
      <div class="tiles-wrapper">
        <div v-for="(row, i) in pixelMap" :key="i" class="grid-tile">
          <div
            v-for="(tile, j) in row"
            :key="j"
            :style="{ backgroundImage: `url(${tile.tile.image})` }"
            class="tile"
          >
            <div
              v-if="tile.prop.name === 'player'"
              :class="characterRotation"
              class="prop character"
            ></div>
            <div
              v-if="tile.prop.name != 'Empty' && tile.prop.name != 'player'"
              :style="{ backgroundImage: `url(${tile.prop.image})` }"
              :class="{ 'near-player': isPlayerNear(j, i) && tile.prop.isInteractive }"
              class="prop"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <player-bars></player-bars>
  <div class="controls">
    <div class="game-block-button"></div>
    <div class="move-buttons">
      <div class="move-button-element button-left" @click="characterMove('left')"></div>
      <div class="move-button-vertical">
        <div class="move-button-element button-up" @click="characterMove('up')"></div>
        <div class="move-button-element button-down" @click="characterMove('down')"></div>
      </div>
      <div class="move-button-element button-right" @click="characterMove('right')"></div>
    </div>
    <div class="game-block-button"></div>
  </div>
</template>

<style scoped>
.game-block-button {
  border: white 1px solid;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-size: 48px;
  background-repeat: no-repeat;
  background-position: center;
}
.move-buttons {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, 60px);
  align-items: end;
}

.move-button-vertical {
  display: flex;
  flex-flow: column;
  gap: 5px;
}

.move-button-element {
  border: white 1px solid;
  cursor: pointer;
  height: 60px;
  width: 60px;
  background-image: url('/sprites/smallIcons/arrows.png');
  background-size: 48px;
  background-repeat: no-repeat;
  background-position: center;
}

.move-button-element.button-left {
  transform: rotate(90deg);
}

.move-button-element.button-up {
  transform: rotate(180deg);
}

.move-button-element.button-down {
  transform: rotate(0deg);
}

.move-button-element.button-right {
  transform: rotate(270deg);
}

.game-block {
  width: 100%;
  height: 600px;
  overflow: hidden;
  background-color: black;
  position: relative;
}

.game-camera {
  position: absolute;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.tiles-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile.playableZone {
  background-image: url('/sprites/tiles/metalFloor.png');
}

.tile.missing {
  background-image: url('/sprites/tiles/missing.png');
}

.character {
  background-image: url('/sprites/characters/char0.png');
}

.character.down {
  background-position-y: 0;
}

.character.right {
  background-position-y: -128px;
}

.character.left {
  background-position-y: -256px;
}

.character.up {
  background-position-y: -384px;
}

.chest {
  background-image: url('/sprites/props/chest.png');
}

.prop {
  cursor: help;
  background-size: var(--tile-size);
  background-repeat: no-repeat;
  width: var(--tile-size);
  height: var(--tile-size);
}

.prop.near-player {
  cursor: pointer;
  filter: drop-shadow(-2px 0 0 #ffffff) drop-shadow(2px 0 0 #ffffff) drop-shadow(0 -2px 0 #ffffff)
    drop-shadow(0 2px 0 #ffffff);
}

.grid-tile {
  display: grid;
}

.tile {
  background-size: var(--tile-size);
  background-repeat: no-repeat;
  width: var(--tile-size);
  height: var(--tile-size);
}

.tile.grid {
  border: rgba(255, 255, 255, 0.27) 1px dashed;
}

.controls {
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 5px;
  display: flex;
  gap: 10px;
}
</style>
