window.onload = function () {
    console.log('页面加载完')
    var app = new MyVue({
        el: '#app',
        data: {
            number: 1
        },
        methods: {
            increment: function () {
                console.log('increment----', this);
                this.number++;
                // console.log('number', this.number);
            }
        }
    })
    // 修改值
    app.$data.number = 2
}

/**
 * [MyVue description]
 * @param {[String]} options.el [dom元素对应的ID,这里dom元素是root dom]
 * @param {[Object]} options.data [绑定的数据]
 * @param {[Object]} options.methods [函数]
 */
function MyVue(options, dd) {
    this.init(options)
}

MyVue.prototype.init = function (options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    this.$methods = options.methods

    // binding保存着model与view的映射关系，也就是我们前面定义的Watcher的实例。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
    this.binding = {}

    this.observe(this.$data)
    this.complie(this.$el)
}

// 监听数据变化
MyVue.prototype.observe = function (obj) {
    var _this = this
    for (var key in obj) {
        var value;
        // 属于自己的属性，而不是来自继承
        if (obj.hasOwnProperty(key)) {
            // console.log('key', key)
            value = obj[key]
            // console.log('value', value, typeof value == 'object')
            if (typeof value == 'object') {
                this.observe(value)
                return
            }
            // 每个属性都有指令集合
            this.binding[key] = {
                directives: []
            }
            // console.log('this.binding', this.binding)
            var binding = this.binding[key]
            Object.defineProperty(this.$data, key, {
                enumerable: true, // 可枚举，如 for...in
                configurable: true, // 可以删除目标属性或再次修改属性
                get: function () {
                    //当获取值的时候触发的函数
                    return value;
                },
                set: function (newValue) {
                    //当设置值的时候触发的函数
                    if (newValue != value) {
                        // console.log('key-value', newValue, key, value, _this.$data)
                        value = newValue
                        // console.log('binding', binding);
                        // 通知属性对应的所有指令更新视图
                        binding.directives.forEach(function (item) {
                            // console.log('item', item);
                            item.update()
                        });
                    }
                }
            })
        }
    }
}

// 监控视图
MyVue.prototype.complie = function (root) {
    // console.log('complie', root);
    var nodes = root.children
    var _this = this
    // console.log('nodes', nodes);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i]
        // console.log('node---', node);
        if (node.children.length) {
            // 节点中包含子节点
            this.complie(node);
            // return
        }

        // v-click
        if (node.hasAttribute('v-click')) {
            var attrVal = node.getAttribute('v-click')
            // console.log('v-click method', attrVal);
            node.onclick = this.$methods[attrVal].bind(this.$data)
        }

        // v-model
        if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
            var attrVal = node.getAttribute('v-model')
            // console.log('v-model:name', _this.$data[attrVal]);
            this.binding[attrVal].directives.push(new Watcher({
                name: 'v-model',
                el: node,
                vm: _this,
                key: attrVal,
                attr: 'value'
            }))
        }

        // v-bind
        if (node.hasAttribute('v-bind')) {
            var attrVal = node.getAttribute('v-bind');
            console.log('v-bind-name', attrVal);
            this.binding[attrVal].directives.push(new Watcher({
                name: 'v-bind',
                el: node,
                vm: _this,
                key: attrVal,
                attr: 'innerHTML'
            }))
        }
    }
    console.log('complie-end', this.binding);
}

// 更新视图
function Watcher(options) {
    this.name = options.name // 指令名字
    this.el = options.el // 指令对应的dom
    this.vm = options.vm // 指令对应的vue实例
    this.key = options.key // 指令中data对应的key值
    this.attr = options.attr // 指令绑定的dom属性，如'innerHTML,value'
    this.update()
}

Watcher.prototype.update = function () {
    console.log('update-view', this.el[this.attr], this.vm);
    this.el[this.attr] = this.vm.$data[this.key]
}
