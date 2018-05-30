// 监控数据变化 (数据属性劫持)
function Observer(data) {
    this.data = data
    console.log('Observer----init--', data);
    this.walk(data)
}

Observer.prototype = {
    walk: function (data) {
        var me = this
        Object.keys(data).forEach(function (key) {
            var val = data[key]
            if (val && typeof val == 'object') {
                // 对象(递归监听)
                new Observer(val)
            } else {
                // 字符串
                me.defineReactive(me.data, key, val);
            }
        })
    },
    defineReactive: function (data, key, val) {
        // console.log('defineReactive', key, val);
        // 每个属性对应一个Dep对象
        var dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                if (Dep.targetWatcher) {
                    // 保存订阅者
                    console.log(`Observer---get--保存订阅者--attr:${key}---value:${val}--`, dep);
                    Dep.targetWatcher.addDep(dep)
                }
                return val
            },
            set: function (newVal) {
                if (newVal == val) {
                    return
                }
                val = newVal
                console.log(`Observer---set----${key}:${newVal}--`, dep);
                // 新值是object继续监听
                if (val && typeof val == 'object') {
                    // 对象(递归监听)
                    // console.log(`Observer---${key}--set--新对象`);
                    new Observer(val)
                }
                // 数据改变，通知订阅者
                dep.notify();
            }
        })
    }
}

var uid = 0

function Dep() {
    this.id = uid++;
    this.watchers = [];
    // console.log('Dep----init---', this.id, this.watchers);
}

Dep.prototype = {

    /**
     * [addSub 增加订阅者]
     * @param {[Object]} watcher [description]
     */
    addWatcher: function (watcher) {
        this.watchers.push(watcher);
    },

    // 通知订阅者，更新数据
    notify: function () {
        console.log(`depId:${this.id},watchers:`, this.watchers);
        this.watchers.forEach(function (watcher) {
            watcher.update();
        });
    }
};

Dep.targetWatcher = null;
