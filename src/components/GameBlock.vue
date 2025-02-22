<script setup>
import { ref, onMounted } from 'vue';

// Путь к изображению
const imageSrc = '/sprites/locationMaps/testMap.png';

// Карта цветов, где ключ — hex-код цвета, а значение — соответствующий тип зоны
const colorMap = {
  '#000000': 'playableZone',
  '#ff0000': 'player',
  '#0026ff': 'exit',
  '#b200ff': 'interactiveObject',
  '#ffffff': 'empty',
};

const pixelMap = ref([]);
const characterPosition = ref({ x: 0, y: 0 });

const loadImage = () => {
  const img = new Image();
  img.src = imageSrc;
  img.crossOrigin = 'Anonymous'; // Важно, если картинка с другого домена
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

      // Если найден игрок, записываем его координаты
      if (tileType === 'player') {
        characterPosition.value = { x, y };
      }
    }
    result.push(row);
  }
  pixelMap.value = result;
};

// Функция перевода RGB в HEX
const rgbToHex = (r, g, b) => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

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
    }
  }
};

onMounted(loadImage);
</script>

<template>
  <div class="tiles-wrapper">
    <div v-for="(row, i) in pixelMap" :key="i" class="grid-tile">
      <div
        v-for="(tile, j) in row"
        :key="j"
        :class="{ playableZone: tile !== 'empty', missing: tile === 'missing' }"
        class="tile"
      >
        <div v-if="tile === 'player'">char</div>
        <div v-if="tile === 'interactiveObject'">[]</div>
        <div v-if="tile === 'exit'">Exit</div>
      </div>
    </div>
  </div>
  <div class="controls">
    <button @click="characterMove('up')">Up</button>
    <button @click="characterMove('down')">Down</button>
    <button @click="characterMove('left')">Left</button>
    <button @click="characterMove('right')">Right</button>
  </div>
</template>

<style scoped>
.tiles-wrapper {
  overflow: auto;
  background-color: black;
  width: 100%;
  height: 400px;
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

.grid-tile {
  display: grid;
}

.tile {
  background-size: var(--tile-size);
  background-repeat: no-repeat;
  width: var(--tile-size);
  height: var(--tile-size);
}

.controls {
  width: 100%;
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
