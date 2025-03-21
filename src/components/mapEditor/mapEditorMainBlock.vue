<script setup lang="ts">
import { ref } from 'vue';
import {
  type AllProps,
  allProps,
  type AllTiles,
  allTiles,
  type MapElement,
} from '@/utilites/tileList.ts';
const mapSize = 16;
const mapArray = new Array(mapSize).fill(null).map(() => ({
  tile: {
    image: '',
    name: 'Empty',
  },
  prop: {
    image: '',
    name: 'Empty',
    isInteractive: false,
  },
  collision: true,
}));
const map: MapElement[][] = Array.from({ length: mapSize }, () => structuredClone(mapArray));
const editingMap = ref<MapElement[][]>(map);
const selectedContentMenu = ref<'tiles' | 'props' | 'int.object'>('tiles');

const selectedContent = ref<AllTiles | AllProps>(allTiles[1]);
const isCollision = ref<boolean>(false);
const isDraw = ref<boolean>(false);
const mouseKeycode = ref<number>(0);
const isGridShown = ref<boolean>(true);
const isCollisionShown = ref<boolean>(true);
const mapName = ref<string>('map');
const selectedContentType = ref<'tiles' | 'props' | 'int.object'>('tiles');

const tileDraw = (x: number, y: number) => {
  // Левая кнопка мыши
  console.log(mouseKeycode.value);
  if (selectedContentType.value === 'tiles') {
    editingMap.value[x][y].tile = selectedContent.value;
  } else if (selectedContentType.value === 'props') {
    editingMap.value[x][y].prop = selectedContent.value;
  }
  if (mouseKeycode.value === 2) {
    isCollision.value = true;
  } else if (mouseKeycode.value === 0) {
    isCollision.value = false;
  }
  editingMap.value[x][y].collision = isCollision.value;
};

const exportMapAsJSON = async () => {
  try {
    const jsonData = JSON.stringify(editingMap.value, null, 2);

    // Проверяем поддержку API
    if (!window.showSaveFilePicker) {
      alert(
        'Ваш браузер не поддерживает выбор папки сохранения. Файл будет загружен в папку загрузок.',
      );
      downloadFallback(jsonData);
      return;
    }

    // Открываем окно выбора места сохранения
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: `${mapName.value}.json`,
      types: [{ description: 'JSON File', accept: { 'application/json': ['.json'] } }],
    });

    // Записываем файл
    const writable = await fileHandle.createWritable();
    await writable.write(jsonData);
    await writable.close();
  } catch (error) {
    console.error('Ошибка при сохранении файла:', error);
  }
};
const onMouseDown = (event: MouseEvent) => {
  mouseKeycode.value = event.button;
  isDraw.value = !isDraw.value;
};
// Фолбэк, если браузер не поддерживает `showSaveFilePicker`
const downloadFallback = (jsonData) => {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${mapName.value}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
const importMapFromJSON = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const json = e.target?.result as string;
      const parsedMap = JSON.parse(json);

      // Проверка на корректность структуры данных
      if (Array.isArray(parsedMap)) {
        editingMap.value = parsedMap;
      } else {
        alert('Неверный формат файла!');
      }
    } catch (error) {
      console.error('Ошибка загрузки JSON:', error);
      alert('Ошибка загрузки карты.');
    }
  };

  reader.readAsText(file);
};
</script>

<template>
  <div
    class="main-editor-block"
    @mousedown="(event) => onMouseDown(event)"
    @mouseup="(event) => onMouseDown(event)"
  >
    <div class="left-menu">
      <div class="options-wrapper">
        <router-link :to="'/'">Back to the game</router-link>
        <span>Show grid: <input v-model="isGridShown" type="checkbox" /></span>
        <span>Show collision: <input v-model="isCollisionShown" type="checkbox" /></span>
      </div>
      <div class="file-wrapper">
        <div class="selected-options">
          <input id="fileInput" type="file" accept="application/json" @change="importMapFromJSON" />
        </div>
        <div class="selected-options">
          <div class="download-button" @click="exportMapAsJSON">Save map</div>
        </div>
      </div>
      <div class="selected-wrapper">
        <div class="selected-options">
          <span>Has collision?: <input v-model="isCollision" type="checkbox" /></span>

          <span>type: {{ selectedContentType }}</span>
        </div>

        <div class="selected-block" :style="{ backgroundImage: `url(${selectedContent.image})` }">
          {{ selectedContent.name }}
        </div>
      </div>
    </div>
    <div class="editor-block">
      <div class="tiles-wrapper" @contextmenu.prevent>
        <div v-for="(row, i) in editingMap" :key="i" class="grid-tile">
          <div
            v-for="(tile, j) in row"
            :key="j"
            :style="{ backgroundImage: `url(${tile.tile.image})` }"
            class="tile"
            :class="{ grid: isGridShown }"
            @mouseover="
              (event) => {
                if (isDraw) {
                  tileDraw(i, j);
                }
              }
            "
            @mousedown="
              (event) => {
                mouseKeycode = event.button;
                tileDraw(i, j);
              }
            "
          >
            <div
              :class="{ collision: tile.collision && isCollisionShown }"
              class="prop"
              :style="{ backgroundImage: `url(${tile.prop.image})` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-menu">
      <div class="button-wrapper">
        <div
          :class="{ selected: selectedContentMenu === 'tiles' }"
          class="button"
          @click="selectedContentMenu = 'tiles'"
        >
          Tiles
        </div>
        <div
          :class="{ selected: selectedContentMenu === 'props' }"
          class="button"
          @click="selectedContentMenu = 'props'"
        >
          Props
        </div>
      </div>
      <div v-if="selectedContentMenu === 'tiles'" class="content-wrapper">
        <div
          v-for="(item, i) in allTiles"
          :key="i"
          :style="{ backgroundImage: `url(${item.image})` }"
          class="content-block"
          @click="
            () => {
              selectedContent = item;
              selectedContentType = 'tiles';
            }
          "
        >
          {{ item.name }}
        </div>
      </div>
      <div v-if="selectedContentMenu === 'props'" class="content-wrapper">
        <div
          v-for="(item, i) in allProps"
          :key="i"
          :style="{ backgroundImage: `url(${item.image})` }"
          class="content-block"
          @click="
            () => {
              selectedContent = item;
              selectedContentType = 'props';
            }
          "
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #66b5b7;
  cursor: pointer;
}

.options-wrapper {
  padding: 20px;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
}

.file-wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  height: 800px;
  width: 100%;
  border-top: rgba(255, 255, 255, 0.2) solid 1px;
}

.selected-options {
  display: flex;
  flex-flow: column;
  border: rgba(255, 255, 255, 0.2) solid 1px;
  width: 256px;
}

.selected-block {
  width: 256px;
  height: 256px;
  background-position: center;
  background-size: 256px;
  border: rgba(255, 255, 255, 0.2) solid 1px;
}

.selected-wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 800px;
  width: 100%;
  border-top: rgba(255, 255, 255, 0.2) solid 1px;
}

.content-block {
  cursor: pointer;
  width: 128px;
  height: 128px;
  background-position: center;
  background-size: 128px;
  border: rgba(255, 255, 255, 0.2) solid 1px;
}

.content-wrapper {
  padding: 20px;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(3, 128px);
}

.button {
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  border-right: 1px white solid;
  border-bottom: 1px white solid;
}

.button:hover {
  background-color: white;
  color: black;
}
.button.selected {
  background-color: white;
  color: black;
}

.button-wrapper {
  width: 500px;
  align-content: space-between;
  display: flex;
}

.editor-block {
  background-color: #23313f;
  width: 1000px;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.right-menu {
  flex-flow: column;
  display: flex;
  width: 500px;
}

.left-menu {
  flex-flow: column;
  display: flex;
  align-items: flex-end;
  width: 300px;
}

.main-editor-block {
  display: flex;
  width: 1800px;
  height: 900px;
  border-radius: 5px;
  background-color: #2c3e50;
}

.tiles-wrapper {
  cursor: crosshair;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prop {
  font-size: 10px;
  background-size: var(--map-editor-tile-size);
  background-repeat: no-repeat;
  width: var(--map-editor-tile-size);
  height: var(--map-editor-tile-size);
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
  background-size: var(--map-editor-tile-size);
  background-repeat: no-repeat;
  width: var(--map-editor-tile-size);
  height: var(--map-editor-tile-size);
}

.tile.grid {
  border: rgba(255, 255, 255, 0.27) 1px dashed;
}

.collision {
  background-color: rgba(255, 0, 0, 0.27);
}
</style>
