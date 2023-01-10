console.log('inicio');

setTimeout(() => {
    console.log('1ero');
}, 3000);

setTimeout(() => {
    console.log('2do');
}, 0);

setTimeout(() => {
    console.log('3ero');
}, 0);

console.log('fin');