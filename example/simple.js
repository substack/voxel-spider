var createGame = require('voxel-engine');
var voxel = require('voxel');
var skin = require('minecraft-skin');
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

window.spider = spider;
