require(['Arithmetic'], function (arithmetic) {
    console.log('Arithmetic 加法', arithmetic.add(10, 20))
    console.log('Arithmetic 减法', arithmetic.subtraction(10, 20))
    console.log('Arithmetic 乘法', arithmetic.multiplication(10, 20))
    console.log('Arithmetic 除法', arithmetic.division(10, 20))
    console.log('Arithmetic 取余', arithmetic.remainder(10, 20))
})
