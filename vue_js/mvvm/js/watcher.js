// 指令监视器,若属性变化，则通知指令对应的dom节点变化

// 1. 每次调用update()的时候会触发相应属性的getter
// getter里面会触发dep.addWatcher()，继而触发这里的addDep

// 2. 假如相应属性的dep.id已经在当前watcher的depIds里，说明不是一个新的属性，仅仅是改变了其值而已
// 则不需要将当前watcher添加到该属性的dep里

// 3. 假如相应属性是新的属性，则将当前watcher添加到新属性的dep里
// 如通过 vm.child = {name: 'a'} 改变了 child.name 的值，child.name 就是个新属性
// 则需要将当前watcher(child.name)加入到新的 child.name 的dep里
// 因为此时 child.name 是个新值，之前的 setter、dep 都已经失效，如果不把 watcher 加入到新的 child.name 的dep中
// 通过 child.name = xxx 赋值的时候，对应的 watcher 就收不到通知，等于失效了

// 4. 每个子属性的watcher在添加到子属性的dep的同时，也会添加到父属性的dep
// 监听子属性的同时监听父属性的变更，这样，父属性改变时，子属性的watcher也能收到通知进行update
// 这一步是在 this.get() --> this.getVMVal() 里面完成，forEach时会从父级开始取值，间接调用了它的getter
// 触发了addDep(), 在整个forEach过程，当前wacher都会加入到每个父级过程属性的dep
// 例如：当前watcher的是'child.child.name', 那么child, child.child, child.child.name这三个属性的dep都会加入当前watcher

/**
 * [Watcher description]
 * @param {[type]}   vm             [MVVM对象]
 * @param {[type]}   directiveValue [指令value,如v-model="someStr"中的someStr，并且someStr是MVVM中data对象的一个属性]
 * @param {Function} cb             [回调函数,参数是属性对应的新值]
 */
function Watcher(vm, directiveValue, cb) {
    this.vm = vm;
    this.directiveValue = directiveValue;
    this.cb = cb;
    this.depIds = {};
    console.log('Watcher-----init---', directiveValue, typeof directiveValue);

    if (typeof directiveValue === 'function') {
        this.getter = directiveValue;
    } else {
        this.getter = this.parseGetter(directiveValue);
    }

    // 保存指令对应值
    this.value = this.get();
}

Watcher.prototype = {
    /**
     * [parseGetter description]
     * @param  {[type]} directiveValue [指令value]
     * @return {[type]}                [description]
     */
    parseGetter: function (directiveValue) {
        if (/[^\w.$]/.test(directiveValue)) return;
        var exps = directiveValue.split('.');
        /**
         * [description]
         * @param  {[type]} vm [MVVM对象]
         * @return {[type]}     [返回指令value在MVVM对象中对应的值]
         */
        return function (vm) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!vm) return;
                var exp = exps[i];
                vm = vm[exp];
            }
            console.log(`Watcher---get--content---${directiveValue}:${vm}`);
            return vm;
        }
    },

    /**
     * [addDep description]
     * @param {[type]} dep [description]
     */
    addDep: function (dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addWatcher(this);
            this.depIds[dep.id] = dep;
        } else {
            console.log(`Watcher---属性对应的订阅者已存在，不需要再保存`, dep);
        }
    },

    update: function () {
        // 新值
        var value = this.get();
        // 旧值
        var oldVal = this.value;
        console.log(`Watcher---update--新值:${value}--旧值:${oldVal}`);
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },

    /**
     * [get 获取指令对应的值]
     * @return {[type]} [description]
     */
    get: function () {
        Dep.targetWatcher = this;
        // console.log('Watcher--get--content---ago----', Dep.targetWatcher);
        console.log('Watcher--get--content---ago----');
        var value = this.getter.call(this.vm, this.vm);
        Dep.targetWatcher = null;
        console.log('Watcher--get--content---after----', value);
        return value;
    }

}
