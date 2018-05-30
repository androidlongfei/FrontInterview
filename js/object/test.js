function Person( age, name ) {

	this.show = function ( ) {
		console.log( age + '==' + name );
	}

}

function Wes () {
	zhan = '12';
	// console.log(zhan);
	getName = function (){
		console.log('log1');
	}
	this.getName = function(){
		console.log('log2');
	}
}
getName = function(){
	console.log('log3')
}
Wes();
getName();
console.log(zhan);
// new new Wes().getName();
