// 解析指令，绑定指令监控器和数据
// 数据变化时(Observer)，通知指令监控器（Watcher）,更新指令对应的dom节点(Compile)
// Dep是Observer和Watcher之间的桥梁

function Compile(el, vm) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.$vm = vm;

    console.log('Compile--------init', this.$el);

    if (this.$el) {
        this.init();
    }
}

Compile.prototype = {
    // 是否是元素节点，例如<div></div>
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    // 是否文本节点
    isTextNode: function (node) {
        return node.nodeType == 3;
    },
    // 属性是否是指令,以v-开头,如v-model,v-show
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    // 事件指令,以v-on开头
    isEventDirective: function (dir) {
        return dir.indexOf('on') === 0;
    },

    init() {
        // this.compileElement(this.$fragment);
        this.compileElement(this.$el);
    },
    // 遍历文档，编译指令
    compileElement(el) {
        var childNodes = el.childNodes;
        var me = this;
        // console.log(`Compile----------compileElement-----childNodes`, childNodes);
        childNodes.forEach(function (node) {
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
            // console.log(`textContent:${text},node:`, me.isTextNode(node), reg.test(text), node);
            if (me.isElementNode(node)) {
                // 元素节点,例如<div></div>,<p></p>
                console.log('Compile---元素节点', node);
                me.compile(node)
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 文本节点，并且包含{{}}
                // 注意文本节点不含子节点
                console.log('Compile---文本节点,并包含{{}}--', node);
                // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
                // console.log(`文本节点textContent:${text};内容${RegExp.$1},node:`, node);
                me.compileText(node, RegExp.$1);
            }

            // 备注:<p>{{test}}<p>,其中p是元素节点，并且包含文本节点{{test}},文本节点不包含子节点
            if (node.childNodes && node.childNodes.length) {
                // 节点中包含子节点
                // console.log('Compile--元素节点包含的子节点', node.childNodes[0]);
                me.compileElement(node);
            }
        })
    },
    // 解析元素节点
    compile: function (node) {
        var nodeAttrs = node.attributes
        // console.log('nodeAttrs', nodeAttrs, typeof nodeAttrs);
        var me = this;
        var nodeAttrArr = [].slice.call(nodeAttrs)
        // console.log('Compile---元素节点属性集合', nodeAttrArr);
        nodeAttrArr.forEach(function (attr) {
            var attrName = attr.name;
            // 是mvvm指令
            if (me.isDirective(attrName)) {
                // console.log(`Compile---指令属性,name:${attr.name},value:${attr.value},attr:`, attr);
                var directiveValue = attr.value;
                var directiveName = attrName.substring(2);
                if (me.isEventDirective(directiveName)) {
                    // 事件指令 v-on
                    // console.log(`事件指令:${directiveName}`);
                    compileUtil.eventHandler(node, me.$vm, directiveValue, directiveName);
                } else {
                    // 普通指令 v-model , v-html , v-text等
                    console.log(`普通指令:${directiveName}--${directiveValue}`);
                    if (compileUtil[directiveName]) {
                        compileUtil[directiveName](node, me.$vm, directiveValue);
                    }
                }
            }
        })
    },
    // 解析文本节点
    compileText: function (node, directiveValue) {
        // console.log('Compile---compileText---', node, directiveValue);
        compileUtil.text(node, this.$vm, directiveValue);
    }
}

// 工具集
var compileUtil = {

    /**
     * [html 处理v-html指令]
     * @param  {[type]} node           [元素节点对象]
     * @param  {[type]} vm             [MVVM对象]
     * @param  {[type]} directiveValue [指令value]
     * @return {[type]}                [description]
     */
    html: function (node, vm, directiveValue) {
        this.bind(node, vm, directiveValue, 'html');
    },

    /**
     * [class 处理v-class指令]
     * @param  {[type]} node [元素节点对象]
     * @param  {[type]} vm   [MVVM对象]
     * @param  {[type]} directiveValue  [指令value]
     * @return {[type]}      [description]
     */
    class: function (node, vm, directiveValue) {
        this.bind(node, vm, directiveValue, 'class');
    },

    /**
     * [text 处理{{}}和v-text指令]
     * @param  {[type]} node [元素节点对象]
     * @param  {[type]} vm   [MVVM对象]
     * @param  {[type]} directiveValue  [指令value]
     * @return {[type]}      [description]
     */
    text: function (node, vm, directiveValue) {
        // console.log('text----', node, directiveValue);
        this.bind(node, vm, directiveValue, 'text');
    },

    /**
     * [eventHandler 事件指令处理,如v-on]
     * @param  {[Object]} node [元素节点对象]
     * @param  {[Object]} vm   [MVVM对象]
     * @param  {[String]} directiveValue  [指令value]
     * @param  {[String]} directiveName  [指令name]
     * @return {[type]}      [description]
     */
    eventHandler: function (node, vm, directiveValue, directiveName) {
        var eventType = directiveName.split(':')[1];
        var fn = vm.$options.methods && vm.$options.methods[directiveValue];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    /**
     * [model 处理v-model指令]
     * @param  {[type]} node           [元素节点对象]
     * @param  {[type]} vm             [MVVM对象]
     * @param  {[type]} directiveValue [指令value]
     * @return {[type]}                [description]
     */
    model: function (node, vm, directiveValue) {
        this.bind(node, vm, directiveValue, 'model');
        var me = this;
        var val = this.getVMVal(vm, directiveValue);
        // console.log(`CompileUtil--model---${directiveValue}:${val}`);
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            me.setVMVal(vm, directiveValue, newValue);
            val = newValue;
        });
    },

    /**
     * [getVMVal 根据指令value获取MVVM中的值]
     * @param  {[type]} vm             [MVVM对象]
     * @param  {[type]} directiveValue [指令value]
     * @return {[type]}                [description]
     */
    getVMVal: function (vm, directiveValue) {
        var val = vm;
        var exp = directiveValue.split('.');
        exp.forEach(function (k) {
            val = val[k];
        });
        // console.log(`CompileUtil--getVMVal---${directiveValue}:${exp}`);
        return val;
    },

    /**
     * [setVMVal 更新MVVM中的值]
     * @param {[type]} vm             [MVVM对象]
     * @param {[type]} directiveValue [指令value]
     * @param {[type]} value          [新值]
     */
    setVMVal: function (vm, directiveValue, value) {
        var val = vm;
        var exp = directiveValue.split('.');
        exp.forEach(function (k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                // 更新vm中的数据
                val[k] = value;
            }
        });
    },

    /**
     * [bind description]
     * @param  {[type]} node           [元素节点对象]
     * @param  {[type]} vm             [MVVM对象]
     * @param  {[type]} directiveValue [指令value]
     * @param  {[type]} directiveName  [指令name]
     * @return {[type]}                [description]
     */
    bind: function (node, vm, directiveValue, directiveName) {
        // console.log('bind', directiveName + 'Updater');
        var updaterFnName = directiveName + 'Updater';
        var updaterFn = updaterNodeContent[updaterFnName];
        updaterFn && updaterFn(node, this.getVMVal(vm, directiveValue));
        // console.log(`CompileUtil--bind---${updaterFnName}`);
        // 监控器，监视属性变化
        new Watcher(vm, directiveValue, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
    }
}

var updaterNodeContent = {
    /**
     * [textUpdater 更新{{}}对应的node内容]
     * @param  {[type]} node  [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    textUpdater: function (node, value) {
        if (value) {
            node.textContent = value
        } else {
            node.textContent = ''
        }
    },

    htmlUpdater: function (node, value) {
        // console.log('--------------------------------htmlUpdater', node, value);
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function (node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');
        var space = className && String(value) ? ' ' : '';
        node.className = className + space + value;
    },

    /**
     * [modelUpdater 更新v-model指令对应的node内容]
     * @param  {[type]} node     [description]
     * @param  {[type]} value    [description]
     * @param  {[type]} oldValue [description]
     * @return {[type]}          [description]
     */
    modelUpdater: function (node, value, oldValue) {
        // console.log('modelUpdater', node, value);
        if (value) {
            node.value = value
        } else {
            node.value = ''
        }
    }
};
