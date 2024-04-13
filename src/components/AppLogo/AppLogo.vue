<template>
  <router-link
    class="app-logo"
    to="/"
  >
    <svg
      width="60"
      height="60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="30"
        y="30"
        font-family="Crosterian"
        font-weight="900"
        fill="#42b883"
        class="fill-primary"
        text-anchor="middle"
        alignment-baseline="middle"
        style="font-style: italic;"
      >SEED</text>
    </svg>
  </router-link>
</template>

<style scoped lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  text-decoration: none;

  .logo-svg{
    height: 40px;
    width: 40px;
  }

  span {
    line-height: 60px;
  }

  &:hover {
    animation: pulse 0.3s forwards;
  }
}
</style>
