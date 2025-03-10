<script setup lang="ts"></script>

<template>
  <div class="use-button" @click="() => {}">
    <div>Do something</div>
  </div>
</template>

<style scoped>
.use-button {
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 100%;
  border: 1px solid white;
  border-top: none;
  color: white;
  background: linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.25) 0%,
    rgba(255, 0, 0, 0.13) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.use-button:hover {
  text-shadow: black 0 3px 3px;
  background-size: 160px;
  background-image: url('/sprites/background/bgMozaicRed.png');
  animation: button-slide 10s linear infinite;
  color: red;
}

@keyframes button-slide {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
}
</style>
