/**
 * obj arguments
 */

function displayInfoObj(args) {
  console.log('args.obj', args);
  console.log('args.name', args.name)
  console.log('args.age', args.age);
}

displayInfoObj({
  name: 'zhangsan',
  age: 100
})

function displayInfo() {
  console.log('arguments', arguments);
  console.log('arguments[0]', arguments[0]);
  console.log('arguments[1]', arguments[1]);
}

displayInfo('lisi', 30)
