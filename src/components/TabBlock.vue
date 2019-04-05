<template>
    <div :class="'hyp-block ' + hoverClass" @mouseover="onMouseEnter" @mouseout="onMouseLeave">

        <ActionBar
            class="vc-action-bar"
            moveBtnClass="blHandle"
            :name="getSelf.type"
            :id="id"
            :collapsed="collapsed"
            :collapseAction="onCollapse"
            :cloneAction="clone"
            :editAction="edit"
            :removeAction="remove" />

        <div class="hyp-block-wrapper" v-if="!collapsed">
            <!-- <div v-if="preview" v-html="preview"></div> -->
            <b-card no-body>
                <b-tabs card>
                    <!-- Render Tabs -->

                    <b-tab v-for="(item, i) in tabs" :title="item.title" :key="`'tabs-' + ${i}`">
                        <Nester v-if="item.code" :id="`${getNesterID(item.code)}`" />
                    </b-tab>

                    <!-- Render this if no tabs -->
                    <div slot="empty" class="text-center text-muted">There are no tabs</div>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>


<script>
import { childsortable, collapseable, hasHoverControl } from '../mixins/base'
import { ADD_COMPONENT } from '../mutation-types'
import Block from './Block'

export default {
    extends: Block,
    mixins: [childsortable, collapseable, hasHoverControl],

    data () {
        return {
            tabCounter: 0
        }
    },
    computed: {
        tabs () {
            if (this.getSelf.settings.tabItems) return this.getSelf.settings.tabItems
            else return []
            // return this.getSelf.settings.tabItems
        }
    },
    methods: {
        getNesterID(code) {
            for (let i = 0; i < this.children.length; i++) {
                if (this.children[i].code == code) return this.children[i].id
            }
        },

        createTabItem(code) {
            if (!this.getNesterID(code)) {
                this.$store.commit(ADD_COMPONENT, {
                    component: { ...this.$hyper.pm.get_default_values_for('nestableitem'), code: code},
                    parent_id: this.id,
                    getters: this.$store.getters
                })
            }
        }
    },
    watch: {
        tabs (old, newV) {
            for (let i = 0; i<this.tabs.length; i++) {
                if (this.tabs[i].code)
                    this.createTabItem(this.tabs[i].code)
            }
        }
    }
}

</script>



<style lang="scss">
.hyp-block {
    .hyp-block-wrapper{
      .card{
          border-top: none;
          .tabs{
            .card-header{
              border-top: 1px solid #eee;
              padding: 0;

              ul{
                margin: 0;
                padding: 0;
                li{
                  margin-bottom: 0;
                  a{
                    border: none;
                    border-radius: 0;
                    padding: 15px;
                    font-size: 14px;
                  }
                }
                &:active{
                  outline: none !important;
                }
                &:focus{
                  outline: none;
                }

              }

            }

          }

        }
    }
}
</style>
