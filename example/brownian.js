var createGame = require('voxel-engine');
var voxel = require('voxel');
var game = createGame({
    generate: voxel.generator['Valley'],
    texturePath: '/textures/'
});
game.appendTo('#container');

var createPlayer = require('voxel-player')(game);
var substack = createPlayer('substack.png');
substack.possess();

window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 'R'.charCodeAt(0)) {
        substack.toggle();
    }
});

var createSpider = require('../')(game);
var spider = createSpider();
spider.position.y = 200;

setInterval(function () {
    spider.position.y += 1;
}, 250);

setTimeout(function f () {
    spider.move(0, 0, 0.1);
    setTimeout(f, 2000 * Math.random());
}, 2000 * Math.random());

setTimeout(function f () {
    spider.rotation.y += Math.PI * (Math.random() - 0.5);
    setTimeout(f, 2000 * Math.random());
}, 2000 * Math.random());

window.spider = spider;
