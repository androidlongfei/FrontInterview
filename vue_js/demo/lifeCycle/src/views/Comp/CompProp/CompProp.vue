<template>
<div class="comp">
    <m-header :num="num" />
    <div class="main">
        <m-side @add="handleAdd" @reset="handleReset" />
        <m-body :num="num" @change="handleChange" />
    </div>
    <m-footer />
</div>
</template>

<script>
import MHeader from './MHeader'
import MFooter from './MFooter'
import MBody from './MBody'
import MSide from './MSide'

export default {
    data() {
        return {
            num: 0
        }
    },
    methods: {
        handleAdd(data) {
            console.log('comp---on...add', data);
            this.num += 1
        },
        handleChange(val) {
            console.log('comp---on...change', val);
            this.num = val
        },
        handleReset() {
            this.num = 0
        }
    },
    components: {
        MHeader,
        MFooter,
        MBody,
        MSide
    }
}
</script>

<style lang="scss" scoped>
.main {
    margin: 10px 0;
    display: flex;
    .m-side {
        width: 200px;
        margin-right: 10px;
    }
    .m-body {
        flex: 1;
    }
}
</style>
