<template>
    <component :is="componentToLoad" :id="id"></component>
</template>
<script>
export default {
    props: ['id', 'name'],
    computed: {
        componentToLoad () {
            const comp = this.$hyper.pm.getVueComponent(this.name)
            return (comp) ? comp : 'Block'
        }
    }
}
</script>
