<template>
    <div :class="'vc-action-bar ' + (collapsed? 'forceVisible ': ' ') + (editing? 'editing': '')">
        <div class="float-left hyp-btn-wrap">
            <b-btn v-if="moveBtnClass" :class="moveBtnClass"><icon name="move"></icon></b-btn>
            <b-btn v-if="createAction" @click="createAction"><icon name="plus"></icon></b-btn>
            <b-btn v-if="cloneAction" @click="cloneAction"><icon name="clone"></icon></b-btn>
            <span v-if="name" class="itemType">{{ name }}</span>
        </div>
        <div class="float-right hyp-btn-wrap">
            <b-btn v-if="collapseAction" @click="collapseAction">
                <icon v-if="collapsed" name="collapse-open"></icon>
                <icon v-else name="collapse-close"></icon>
            </b-btn>
            <b-btn v-if="editAction" @click="editAction"><icon name="settings"></icon></b-btn>
            <b-btn v-if="removeAction" @click="removeAction"><icon name="delete"></icon></b-btn>
        </div>
    </div>
</template>

<script>
export default {
    props:['name', 'moveBtnClass', 'cloneAction', 'editAction', 'removeAction', 'createAction', 'collapseAction', 'collapsed', 'id'],

    computed: {
        editing (){
            return (this.$store.state.editComponentID &&
                this.$store.state.showEditPanel &&
                this.id == this.$store.state.editComponentID) ? true : false
        }
    }
}
</script>

<style lang="scss">
.showControl {
    border-color: #007bff !important;
}
.showControl > .vc-action-bar:first-child {
    visibility: visible
}
.vc-action-bar {
    position: absolute;
    visibility: hidden;
    width: 200px;
    // margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background: #007bff;
    clear: both;
    height: 20px;
    z-index: 5000;
    .hyp-btn-wrap{
        line-height: 0;
        padding: 2px 5px;
    }
    .btn {
        line-height: 0;
        padding: 2px;
        background: none;
        color: #fff;
        border: none;
        svg{
            width: 12px;
            height: 12px;
        }
        &:hover {
            background: #007bff;
            color: #fff;
        }
    }
    span.editing {
        padding: 2px;
        color: #007bff;
        svg {
            width: 12px;
            height: 12px;
        }
    }
    span.itemType {
        font-size: 10px;
        color: #eee
    }
}

.vc-action-bar.forceVisible {
    visibility: visible !important;
    background: #aaa;
}
.vc-action-bar.editing {
    visibility: visible !important;
    background: #007bff;
}

</style>
