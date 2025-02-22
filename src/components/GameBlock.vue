<script setup>
import { ref, onMounted, watch } from 'vue';

const imageSrc = '/sprites/locationMaps/testMap.png';

const colorMap = {
  '#000000': 'playableZone',
  '#ff0000': 'player',
  '#0026ff': 'exit',
  '#b200ff': 'interactiveObject',
  '#ffffff': 'empty',
};

const pixelMap = ref([]);
const characterPosition = ref({ x: 0, y: 0 });
const gameCamera = ref(null);

const loadImage = () => {
  const img = new Image();
  img.src = imageSrc;
  img.crossOrigin = 'Anonymous';
  img.onload = () => processImage(img);
};

const processImage = (img) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const { data, width, height } = imageData;

  const result = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const hex = rgbToHex(r, g, b);
      const tileType = colorMap[hex] || 'missing';
      row.push(tileType);

      if (tileType === 'player') {
        characterPosition.value = { x, y };
      }
    }
    result.push(row);
  }
  pixelMap.value = result;
  updateCamera();
};

const rgbToHex = (r, g, b) => `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

const characterMove = (direction) => {
  const moves = {
    left: { x: 0, y: -1 },
    right: { x: 0, y: 1 },
    up: { x: -1, y: 0 },
    down: { x: 1, y: 0 },
  };

  const move = moves[direction];
  if (move) {
    const newX = characterPosition.value.x + move.x;
    const newY = characterPosition.value.y + move.y;

    if (pixelMap.value[newY] && pixelMap.value[newY][newX] === 'playableZone') {
      pixelMap.value[characterPosition.value.y][characterPosition.value.x] = 'playableZone';
      characterPosition.value = { x: newX, y: newY };
      pixelMap.value[newY][newX] = 'player';
      updateCamera();
    }
  }
};

const updateCamera = () => {
  if (gameCamera.value) {
    const tileSize = 128; // Размер одной клетки
    const centerX = 700 / 2 - tileSize / 2;
    const centerY = 700 / 2 - tileSize / 2;

    gameCamera.value.style.transform = `translate(${centerX - characterPosition.value.y * tileSize}px, ${centerY - characterPosition.value.x * tileSize}px)`;
  }
};

onMounted(loadImage);

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
            :class="{ playableZone: tile !== 'empty', missing: tile === 'missing' }"
            class="tile"
          >
            <div v-if="tile === 'player'" class="prop character"></div>
            <div v-if="tile === 'interactiveObject'">[]</div>
            <div v-if="tile === 'exit'">Exit</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="controls">
    <div class="move-buttons">
      <div class="move-button-element button-left" @click="characterMove('left')"></div>
      <div class="move-button-vertical">
        <div class="move-button-element button-up" @click="characterMove('up')"></div>
        <div class="move-button-element button-down" @click="characterMove('down')"></div>
      </div>
      <div class="move-button-element button-right" @click="characterMove('right')"></div>
    </div>
  </div>
</template>

<style scoped>
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

.prop {
  background-size: var(--tile-size);
  background-repeat: no-repeat;
  width: var(--tile-size);
  height: var(--tile-size);
}

.grid-tile {
  display: grid;
}

.tile {
  background-size: var(--tile-size);
  background-repeat: no-repeat;
  border: rgba(255, 255, 255, 0.27) 1px dashed;
  width: var(--tile-size);
  height: var(--tile-size);
}

.controls {
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  display: flex;
  gap: 10px;
}
</style>
