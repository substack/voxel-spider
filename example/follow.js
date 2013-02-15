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
window.substack = substack;

window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 'R'.charCodeAt(0)) {
        substack.toggle();
    }
});

var createSpider = require('../')(game);
var spider = createSpider();
spider.position.y = 200;

setInterval(function () {
    var a = substack.yaw.position;
    var b = spider.position;
    var angle = Math.atan2(a.x - b.x, a.z - b.z);
    spider.rotation.y = angle;
}, 1000);

setInterval(function () {
    spider.move(0, 0, 0.5);
}, 2000);

window.spider = spider;
