console.log('load main.js');

requirejs.config({
    paths: {
        Arithmetic: 'arithmetic'
    }
});

require(['Arithmetic'], function (arithmetic) {
    console.log('Arithmetic 加法', arithmetic)
})
