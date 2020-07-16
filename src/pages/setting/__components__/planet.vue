<style lang="scss">
@include b(planet) {
  background-color: #090723;
  overflow: hidden;
  @include e(o) {
    position: absolute;
    opacity: .3;
    border-radius: 50%;
    @include when(1) {
      width: 474px;
      height: 474px;
      right: -100px;
      top: -390px;
      background: linear-gradient(90deg, #ff5a25, #ff005a);
      transition: all 1s linear;
    }
    @include when(2) {
      width: 120px;
      height: 120px;
      right: 60px;
      top: 220px;
      opacity: 0.15;
      background: linear-gradient(90deg, #fff700, #ff7600);
      transition: all 0.6s linear;
    }
    @include when(3) {
      width: 60px;
      height: 60px;
      right: 330px;
      top: 200px;
      opacity: 0.1;
      background: linear-gradient(-90deg, #271e5b, #0d76ef);
      transition: all 0.4s linear;
    }
    @include when(4) {
      width: 25px;
      height: 25px;
      right: 445px;
      top: 136px;
      opacity: 0.2;
      background: linear-gradient(-90deg, #bd4c86, #c864ae);
      transition: all 0.5s linear;
    }
  }
}
</style>

<template>
  <div class="app-planet absolute-parent is-rounded">
    <div class="app-planet__o is-1"></div>
    <div class="app-planet__o is-2"></div>
    <div class="app-planet__o is-3"></div>
    <div class="app-planet__o is-4"></div>
  </div>
</template>
