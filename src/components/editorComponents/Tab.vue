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
    @apply mt-2 mb-2;

    ul.hyp-tab {
      @apply list-reset flex flex-row;

      li.hyp-tab-item {
        @apply flex-1 text-center;

        a.hyp-tab-item-link {
          @apply block py-2 no-underline border-b text-grey-dark;


          &:hover {
            @apply border-blue;
          }
        }

        &.is-active {
          a.hyp-tab-item-link {
            @apply border-blue bg-white rounded-t;
          }
        }
      }

    }
  }

</style>
