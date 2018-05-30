function MVVM(options) {
    this.$options = options || {}
    this._data = this.$options.data
    console.log('MVVM---init---', this.$options);

    var me = this
    // 数据代理
    Object.keys(this._data).forEach(function (key) {
        me._proxyData(key);
    });

    this._initComputed();

    // 监控数据变化
    this.$observer = new Observer(this.$options.data)

    // 解析指令,绑定数据
    this.$compile = new Compile(options.el || document.body, this);

    console.log('MVVM finish', this);
}

MVVM.prototype = {

    /**
     * [$watch 监视器]
     * @param  {[type]}   key     [属性]
     * @param  {Function} cb      [description]
     * @param  {[type]}   options [description]
     * @return {[type]}           [description]
     */
    $watch: function (key, cb, options) {
        new Watcher(this, key, cb);
    },

    // 实现 vm.xxx -> vm._data.xxx
    _proxyData: function (key, setter, getter) {
        var me = this
        // console.log('_proxyData', me, key);
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                return me._data[key]
            },
            set: function (newVal) {
                me._data[key] = newVal
                // console.log('newVal', newVal);
            }
        })
    },
    // 计算属性
    _initComputed: function () {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function (key) {
                Object.defineProperty(me, key, {
                    // get: typeof computed[key] === 'function' ?
                    //     computed[key] : computed[key].get,
                    get: function () {
                        var val = computed[key]
                        if (typeof val === 'function') {
                            // console.log(`key:${key},value:${val}`);
                            val.call(me)
                        } else {
                            val.get.call(me)
                        }
                    },
                    set: function () {}
                });
            });
        }
    },
    test: function () {

    }
}

function observe(value, vm) {
    // console.log('observe---', value, vm);
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};
