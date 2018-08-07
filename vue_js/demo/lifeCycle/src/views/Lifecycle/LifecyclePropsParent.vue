<template>
<div class="parent">
    <h3>父组件</h3>
    <p>年龄:{{this.info.age}}</p>
    <p>姓名:{{this.info.name}}</p>
    <el-button @click="this.handleDestroy">parent销毁{{this.dataVar}}</el-button>
    <el-button @click="this.updateAge">parent更新年龄 {{info.age}}</el-button>
    <lifecycle-props-child compName="child" :info="this.info"></lifecycle-props-child>
</div>
</template>

<script>
import LifecyclePropsChild from '@/views/Lifecycle/LifecyclePropsChild'
const COMPONENT_NAME = 'parent'

export default {
    data() {
        return {
            dataVar: 1,
            info: {
                name: '李四',
                age: 20
            }
        }
    },
    beforeCreate() {
        console.log(`--${COMPONENT_NAME}--beforeCreate`)
    },
    created() {
        console.log(`--${COMPONENT_NAME}--created`, this.info.age)
    },
    beforeMount() {
        console.log(`--${COMPONENT_NAME}--beforeMount`)
    },
    mounted() {
        console.log(`--${COMPONENT_NAME}--mounted`, this.info.age)
    },
    beforeUpdate() {
        console.log(`--${COMPONENT_NAME}--beforeUpdate`, this.info.age)
    },
    updated() {
        console.log(`--${COMPONENT_NAME}--updated`, this.info.age)
    },
    beforeDestroy() {
        console.log(`--${COMPONENT_NAME}--beforeDestroy`)
    },
    destroyed() {
        console.log(`--${COMPONENT_NAME}--destroyed`)
    },
    methods: {
        handleDestroy() {
            this.$destroy()
        },
        updateAge() {
            this.info.age += 1
        }
    },
    components: {
        LifecyclePropsChild
    }
}
</script>
