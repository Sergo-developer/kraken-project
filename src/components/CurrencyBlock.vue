<script setup lang="ts">
import { ref } from 'vue';

const mainCurrency = ref<number>(9000000);
const mainCurrencyString = ref<string>(mainCurrency.value.toLocaleString('ru-RU'));

const premiumCurrency = ref<number>(1800);
const premiumCurrencyString = ref<string>(premiumCurrency.value.toLocaleString('ru-RU'));
</script>

<template>
  <div class="currency-wrapper">
    <div class="currency"><div class="currency-image obligation"></div><div class="currency-value">{{mainCurrencyString}}</div></div>
    <div class="currency"><div class="currency-image premium"></div><div class="currency-value">{{premiumCurrencyString}}</div></div>
  </div>
</template>

<style scoped>
.currency {
  display: flex;
}
.currency-value {
  font-size: 20px;
  color: white;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.currency-image {
  background-position: center;
  background-repeat: no-repeat;
  background-size: 26px;
  height: 28px;
  width: 28px;
}

.currency-image.obligation {
  background-image: url("/sprites/currency/obligation.png");
}

.currency-image.premium {
  background-image: url("/sprites/currency/premium.png");
}

.currency-wrapper {
  background-color: #181818;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  width: 100%;
}
</style>
