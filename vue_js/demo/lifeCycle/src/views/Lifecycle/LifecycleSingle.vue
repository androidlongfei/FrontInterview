<template>
<div>
    <h3 ref="h3">单组件</h3>
    <p ref="p1" :count="this.dataVar" id="p1">count:{{dataVar}}</p>
    <el-button @click="dataVar += 1">更新 {{dataVar}}</el-button>
    <el-button @click="handleDestroy">销毁{{compName}}</el-button>
</div>
</template>

<script>
export default {
    props: {
        compName: {
            type: String,
            default: 'single'
        }
    },
    data() {
        return {
            dataVar: 1
        }
    },
    beforeCreate() {
        // this.compName = 'single'
        // console.log(`--${this.compName}--beforeCreate`)

        console.log('  --data未初始化--beforeCreate', this.dataVar)

        /**
         * this有值 this.dataVar为undefined
         *
         * 已经创建了Vue组件的实例且this已经指向该实例，组件实例的属性还没有初始化，所以无法访问到data、computed、watch、methods上的方法和数据
         *
         * 常用于初始化非响应式变量
         */
    },
    created() {
        console.log(`  --${this.compName}--created`, this.dataVar, this.$el) // 1 undefined
        this.dataVar = 4 // 初始化数据
        /**
         * 组件的属性初始化完成,可访问data、computed、watch、methods上的方法和数据，未挂载到DOM，不能访问到$el属性
         *
         * 页面的初始化，比如初始化data中的属性，注册组件的监听器等
         */
    },
    beforeMount() {
        console.log(`  --${this.compName}--beforeMount`, this.$el) // undefined

        /**
         * 在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数
         */
    },
    mounted() {
        console.log(`  --${this.compName}--mounted`, this.$el, this.$refs.p1) // dom节点

        console.log('h3', this.$refs.h3); // <h3>单组件</h3>

        /**
         * 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，this.$el属性可以获取到dom节点
         *
         * 常用于获取VNode信息和操作，ajax请求
         */
    },
    beforeUpdate() {
        console.log(`  --${this.compName}--beforeUpdate`, this.dataVar, document.getElementById('p1'))

        // this.dataVar = 100

        /**
         * 响应式数据更新时调用,此时响应式数据对应的Dom还没有更新
         *
         * 适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器
         */
    },
    updated() {
        console.log(`  --${this.compName}--updated`, this.dataVar)

        /**
         * 组件DOM已经更新，可执行依赖于DOM的操作
         *
         * 避免在这个钩子函数中操作数据，可能陷入死循环。当然canvas的更新可以在里面做
         */
    },
    beforeDestroy() {
        console.log(`  --${this.compName}--beforeDestroy`, this.dataVar)

        /**
         * 实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例
         */
    },
    destroyed() {
        console.log(`  --${this.compName}--destroyed`)

        /**
         * 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
         */
    },
    methods: {
        handleDestroy() {
            this.$destroy()
        }
    }
}
</script>
