<template>
  <div class="hyp-tab-wrap">
      <ul class="hyp-tab">
        <li class="hyp-tab-item" v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
          <a class="hyp-tab-item-link" href="#" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {tabs: [] };
    },

    created() {

      this.tabs = this.$children;

    },
    methods: {
      selectTab(selectedTab) {
        this.tabs.forEach(tab => {
          tab.isActive = (tab.name == selectedTab.name);
        });
      }
    }
  }
</script>

<style type="text/scss">
  .hyp-tab-wrap {
    @apply h-full overflow-y-auto;
    ul.hyp-tab {
      @apply list-reset flex flex-row bg-grey-light;
      li.hyp-tab-item {
        @apply flex-1 text-center;
        a.hyp-tab-item-link {
          @apply block py-2 no-underline text-grey-darkest;
          &:hover {
            @apply border-blue;
          }
        }
        &.is-active {
          @apply bg-grey-lighter;
          a.hyp-tab-item-link {
            @apply text-grey-darkest rounded-t;
          }
        }
      }

    }
  }

</style>
