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

for (var i = 0; i < 20; i++) (function (spider) {
    spider.position.y = 200;
    spider.position.x = Math.random() * 300 - 150;
    spider.position.z = Math.random() * 300 - 150;
    
    setTimeout(function () {
        setInterval(turnAndJump, 1000);
        setInterval(scuttle, 2000);
    }, 1000 + Math.random() * 1000);
    
    function turnAndJump () {
        var a = substack.yaw.position;
        var b = spider.position;
        var dist = a.distanceTo(b);
        
        var angle = spider.rotation.y;
        if (dist < 500) {
            angle = Math.atan2(a.x - b.x, a.z - b.z)
            angle += Math.random() * 1 / 4 - 1 / 8;
        }
        else {
            angle += Math.random() * Math.PI / 2 - Math.PI / 4;
        }
        spider.rotation.y = angle;
        
        var pt = spider.position.clone();
        pt.x += game.cubeSize / 2 * Math.sin(angle);
        pt.z += game.cubeSize / 2 * Math.cos(angle);
        if (game.getBlock(pt)) {
            spider.move(0, 1, 0.5 * Math.random());
        }
    }
    
    function scuttle () {
        spider.move(0, 0, 0.5 * Math.random());
    }
})(createSpider());
