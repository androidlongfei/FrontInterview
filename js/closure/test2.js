var data= {
    table : [{x:10,y:20},{x:20,y:40}]
};

(function(dm){
    console.log(dm)
    for(var i = 0; i < dm.table.length; i++){
       var row = dm.table[i];
       console.log(row)
       console.log(row.x,row.y)
    }

})(data);

//我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量，因此在函数执行完后会立刻释放资源，关键是不污染全局对象
