//实现类和继承

//我们定义了Person，它就像一个类，我们new一个Person对象，访问它的方法。
//下面我们定义了Jack，继承Person，并添加自己的方法

function Person( ) {
	var name = "default";

	return {
		getName: function ( ) {
			return name;
		},
		setName: function ( newName ) {
			name = newName;
		}
	}
};

var p = new Person( );
p.setName( "Tom" );
console.log(p.getName()) // Tom

var Jack = function ( ) {};
//继承自Person
Jack.prototype = new Person( );

console.log('Jack class', Jack)

//添加私有方法
Jack.prototype.Say = function ( ) {
	console.log( "Hello,my name is Jack" );
};

var j = new Jack( );
console.log('Jack obj', Jack)
j.setName( "Jack" );
j.Say( );
console.log(j.getName()) // Jack
