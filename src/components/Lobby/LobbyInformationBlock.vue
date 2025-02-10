<script setup lang="ts">
const reputation = ['I','II','III','IV','V']
</script>

<template>
  <div class="location-wrapper">
    <div class="location-main-block">
      <div class="location-level-wrapper">
        <div class="small-text">lvl</div>
        <div>15-25</div>
      </div>
      <div class="location-name">• Homopidorvinsk</div>
    </div>
    <div class="location-reputation-block">
      <div class="small-text">reputation</div>
      <div class="reputation-elements-wrapper">
        <div class="reputation-element-wrapper" v-for="(rep, i) in reputation" :key="i">
          <div class="reputation-element">{{rep}}</div>
          <div v-if="i != reputation.length-1" class="reputation-element-divider"></div>
        </div>
      </div>
      <div class="small-text">III - Nice bro</div>
    </div>
    <div class="sub-location-block">
      <div class="location-icon raid"></div>
      <div class="location-level-wrapper">
        <div class="small-text">lvl</div>
        <div>15-19</div>
      </div>
      <div class="location-name">• hangar</div>
    </div>
    <div class="sub-location-block">
      <div class="location-icon raid"></div>
      <div class="location-level-wrapper">
        <div class="small-text">lvl</div>
        <div>19-22</div>
      </div>
      <div class="location-name">• abandoned hide</div>
    </div>
    <div class="sub-location-block">
      <div class="location-icon dungeon"></div>
      <div class="location-level-wrapper">
        <div class="small-text">lvl</div>
        <div>25</div>
      </div>
      <div class="location-name">• grim jopoebalna</div>
    </div>
  </div>
</template>

<style scoped>
.sub-location-block {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px white solid;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.13) 50%, rgba(0,0,0,0) 100%);
}

.reputation-elements-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
}

.reputation-element-wrapper {
  display: flex;
  align-items: center;
}
.reputation-element-divider {
  height: 3px;
  width: 16px;
  background-color: white;
}

.reputation-element {
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: white 3px solid;
  border-radius: 30px;
}

.location-icon {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
  height: 32px;
  width: 32px;
}

.location-icon.dungeon {
  background-image: url("../../../public/sprites/smallIcons/skull0.png");
}

.location-icon.raid {
  background-image: url("../../../public/sprites/smallIcons/arrows.png");
}

.location-reputation-block {
  gap: 3px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  height: 75px;
  border-bottom: 1px white solid;
  border-left: 1px white solid;
  border-right: 1px white solid;
  background-color: rgba(0, 0, 0, 0.25);
}

.location-name {
  display: flex;
  margin-left: 20px;
  justify-content: center;
}

.location-level-wrapper {
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 70px;
  height: 100%;
}

.small-text {
  font-size: 10px;
}

.location-main-block {
  display: flex;
  align-items: center;
  height: 50px;
  border: 1px white solid;
  background-color: rgba(0, 0, 0, 0.25);
}

.location-wrapper {
  width: 50%;
  height: auto;
}

</style>
