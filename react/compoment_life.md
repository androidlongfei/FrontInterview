1.propTypes 或者 getDefaultProps (只调用一次)

作用于组件类，只调用一次，返回对象用于设置默认的props，对于引用值，会在实例中共享。

2.组件创建时调用 (只调用一次)
getInitialState 或者 constructor
作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。

3.在组件渲染之前调用（只调用一次）
componentWillMount

注意:这时mapStateToProps已经在这之前调用，已经将state中的数据映射到了pros中（这时pros的改变不会调用componentWillReceiveProps）,就是this.props中的数据可以用,


4.渲染组件(多次调用)
render

必选的方法，创建虚拟DOM，该方法具有特殊的规则：

只能通过this.props和this.state访问数据
可以返回null、false或任何React组件
只能出现一个顶级组件（不能返回数组）
不能改变组件的状态
不能修改DOM的输出

5.在渲染组件后调用 (只调用一次)
componentDidMount
注意：这时如果state中的数据改变,会调用mapStateToProps方法,将state中改变的数据重新映射到pros,然后触发componentWillReceiveProps方法

比如从服务端获取数据，获取之前在state中定义一个状态fetche=true，会调用componentWillReceiveProps， 获取成功改变状态fetche=false也会调用componentWillReceiveProps

真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。


6.组件属性改变时调用 （多次）
componentWillReceiveProps

7 组件销毁前调用
componentWillUnmount
组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。
