<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import PlayerBars from '@/components/PlayerBars.vue';
import useLocationStore from '@/stores/locationStore.ts';
import type { MapElement } from '@/utilites/tileList.ts';
import { onPlayerUseStore } from '@/utilites/playerObjectsUse.ts';

const { currentSubLocation } = useLocationStore();
const pixelMap = ref<MapElement[][]>([]);
const characterPosition = ref({ x: 0, y: 0 });
const characterRotation = ref('down');
const gameCamera = ref<HTMLDivElement>();

type Directions = 'left' | 'right' | 'up' | 'down';
const DirectionsByCode: Record<string, Directions> = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down',
  KeyA: 'left',
  KeyD: 'right',
  KeyW: 'up',
  KeyS: 'down',
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

const pressedKeys = ref<Set<string>>(new Set());
const lastMoveTime = ref(0);
const moveDelay = 150;

const interactWithNearbyObject = () => {
  const directionOffsets: Record<Directions, { x: number; y: number }> = {
    left: { x: 0, y: -1 },
    right: { x: 0, y: 1 },
    up: { x: -1, y: 0 },
    down: { x: 1, y: 0 },
  };

  const offset = directionOffsets[characterRotation.value as Directions];
  const targetX = characterPosition.value.x + offset.x;
  const targetY = characterPosition.value.y + offset.y;

  if (
    pixelMap.value[targetY] &&
    pixelMap.value[targetY][targetX] &&
    pixelMap.value[targetY][targetX].prop.name !== 'Empty' &&
    pixelMap.value[targetY][targetX].prop.name !== 'player' &&
    pixelMap.value[targetY][targetX].prop.isInteractive
  ) {
    onPlayerUseObject(pixelMap.value[targetY][targetX].prop.name, targetX, targetY);
    return;
  }

  for (let y = 0; y < pixelMap.value.length; y++) {
    for (let x = 0; x < pixelMap.value[y].length; x++) {
      const tile = pixelMap.value[y][x];
      if (tile.prop.name !== 'Empty' && tile.prop.name !== 'player' && tile.prop.isInteractive && isPlayerNear(x, y)) {
        onPlayerUseObject(tile.prop.name, x, y);
        return;
      }
    }
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    event.preventDefault();
    interactWithNearbyObject();
    return;
  }

  const direction = DirectionsByCode[event.code];
  if (direction) {
    const wasEmpty = pressedKeys.value.size === 0;
    pressedKeys.value.add(event.code);

    const now = Date.now();
    if (wasEmpty || now - lastMoveTime.value >= moveDelay) {
      characterMove(direction);
      lastMoveTime.value = now;
    }
  }
};

const handleKeyup = (event: KeyboardEvent) => {
  if (DirectionsByCode[event.code]) {
    pressedKeys.value.delete(event.code);
  }
};

const processMovement = () => {
  if (pressedKeys.value.size > 0) {
    const now = Date.now();
    if (now - lastMoveTime.value >= moveDelay) {
      const lastKey = Array.from(pressedKeys.value)[pressedKeys.value.size - 1];
      const direction = DirectionsByCode[lastKey];
      if (direction) {
        characterMove(direction);
        lastMoveTime.value = now;
      }
    }
  }
};

const animationFrameId = ref<number | null>(null);

const gameLoop = () => {
  processMovement();
  animationFrameId.value = requestAnimationFrame(gameLoop);
};

onMounted(() => {
  loadMapFromJSON();
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('keyup', handleKeyup);
  animationFrameId.value = requestAnimationFrame(gameLoop);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('keyup', handleKeyup);
  if (animationFrameId.value !== null) {
    cancelAnimationFrame(animationFrameId.value);
  }
});

watch(characterPosition, updateCamera);

const onPlayerUseObject = (objectName: string, x: number, y: number) => {
  if (isPlayerNear(x, y) && onPlayerUseStore[objectName]) {
    const isPlayerUseObject = onPlayerUseStore[objectName]();
    if (isPlayerUseObject) {
      pixelMap.value[y][x].collision = false;
      pixelMap.value[y][x].prop = {
        image: '',
        name: 'Empty',
        isInteractive: false,
      };
    }
  }
};
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
              v-if="tile.prop.name !== 'Empty' && tile.prop.name !== 'player'"
              :title="tile.prop.name"
              :style="{ backgroundImage: `url(${tile.prop.image})` }"
              :class="{ 'near-player': isPlayerNear(j, i) && tile.prop.isInteractive }"
              class="prop"
              @click="onPlayerUseObject(tile.prop.name, j, i)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div :class="characterRotation" class="character"></div>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: var(--tile-size);
  height: var(--tile-size);
  background-image: url('/sprites/characters/char0.png');
  background-size: var(--tile-size);
  background-repeat: no-repeat;
  z-index: 10;
  pointer-events: none;
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
