<template>
  <i v-html="icon"></i>
</template>

<script>

  import feather from 'feather-icons'
  import {has} from '../../helpers'

  const MAPPER = {
    'move': 'move',
    'plus': 'plus',
    'plus-square': 'plus-square',
    'clone': 'copy',
    'settings': 'edit',
    'undo': 'corner-up-left',
    'redo': 'corner-up-right',
    'delete': 'trash',
    'times': 'x',
    'save': 'save',
    'collapse-open': 'chevron-down',
    'collapse-close': 'chevron-up',
    'more-menu': 'more-vertical',
    'code': 'code',
    'copy': 'crop',
    'paste': 'clipboard',
    'circle': 'circle'
  }
  export default {
    props: ['name', 'stroke', 'size'],

    computed: {
      icon() {

        if (has(MAPPER, this.name)) {
          return feather.icons[MAPPER[this.name]].toSvg({
            'stroke-width': (this.stroke) ? this.stroke : 2,
            'width': (this.size) ? this.size : 12,
            'height': (this.size) ? this.size : 12
          })
        } else {
          return this.name
        }
      }
    }
  }

</script>
