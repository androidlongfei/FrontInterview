<template>
<div>
    <h3 ref="h3">子组件</h3>
    <p>年龄:{{this.info.age}}</p>
    <p>姓名:{{this.info.name}}</p>
    <el-button @click="handleDestroy">{{compName}}销毁</el-button>
    <el-button @click="this.updateAge">{{compName}}更新年龄 {{info.age}}</el-button>
</div>
</template>

<script>
export default {
    props: {
        compName: {
            type: String,
            default: 'propsChild'
        },
        info: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            dataVar: 1
        }
    },
    beforeCreate() {
        console.log('  --child--beforeCreate') // undefined
    },
    created() {
        console.log(`  --${this.compName}--created`, this.info.age) // 李四
    },
    beforeMount() {
        console.log(`  --${this.compName}--beforeMount`) // undefined
    },
    mounted() {
        console.log(`  --${this.compName}--mounted`) // dom节点
    },
    beforeUpdate() {
        console.log(`  --${this.compName}--beforeUpdate`, this.info.age)
    },
    updated() {
        console.log(`  --${this.compName}--updated`, this.info.age)
    },
    beforeDestroy() {
        console.log(`  --${this.compName}--beforeDestroy`)
    },
    destroyed() {
        console.log(`  --${this.compName}--destroyed`)
    },
    methods: {
        handleDestroy() {
            this.$destroy()
        },
        updateAge() {
            this.info.age += 1
        }
    }
}
</script>
