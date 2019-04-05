<template>
    <component :is="componentToLoad" :id="id" :handle="handle"></component>
</template>
<script>
export default {
    props: ['id', 'name', 'handle'],
    computed: {
        componentToLoad () {
            const comp = this.$hyper.pm.getVueComponent(this.name)
            return (comp) ? comp : 'Block'
        }
    }
}
</script>
