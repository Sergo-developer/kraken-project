<script setup lang="ts">
const xpBarFillPercent: string = '77%';
</script>

<template>
  <div class="main-bars-wrapper">
    <div class="experience-bar-wrapper">
      <div class="experience-bar-level">12</div>
      <div class="experience-bar-background">
        <div :style="{ width: xpBarFillPercent }" class="experience-bar-fill">999/1000</div>
      </div>
    </div>
    <div class="bar-wrapper">
      <div class="player-status-bar-background">
        <div :style="{ width: xpBarFillPercent }" class="bar-fill hp">Health 100/100</div>
      </div>
      <div class="player-status-bar-background">
        <div :style="{ width: xpBarFillPercent }" class="bar-fill oxygen">Oxygen 30/30</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-value {
  position: absolute;
}

.bar-fill {
  padding-left: 10px;
}

.main-bars-wrapper {
  display: flex;
  gap: 5px;
  align-items: center;
  flex-flow: column;
  padding-bottom: 5px;
}

.bar-fill.hp {
  background-color: crimson;
}

.bar-fill.oxygen {
  color: #181818;
  background-color: lightblue;
}

.player-status-bar-background {
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  border: white solid 1px;
}

.bar-wrapper {
  height: 28px;
  display: flex;
  width: 100%;
  gap: 5px;
}

.experience-bar-fill {
  padding-left: 10px;
  display: flex;
  align-items: center;
  color: #181818;
  font-size: 10px;
  background-color: #4cff00;
}
.experience-bar-background {
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  border: white solid 1px;
}

.experience-bar-level {
  background-color: white;
  color: #181818;
  min-width: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.experience-bar-wrapper {
  width: 100%;
  height: 16px;
  color: white;
  display: flex;
}
</style>
