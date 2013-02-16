# voxel-spider

blocky spider creatures for your [voxel.js](http://voxeljs.com) game

# example

[view the swarm demo](http://substack.net/projects/voxel-spider/)

``` js
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

setInterval(function () {
    spider.position.y += 1;
}, 250);

setTimeout(function f () {
    spider.move(0, 0, 0.1);
    setTimeout(f, 2000 * Math.random());
}, 2000 * Math.random());

setTimeout(function f () {
    spider.turn(Math.PI * (Math.random() - 0.5));
    setTimeout(f, 2000 * Math.random());
}, 2000 * Math.random());

window.spider = spider;
```

# methods

``` js
var voxelSpider = require('voxel-spider')
```

## var createSpider = voxelSpider(game)

Return a function `createSpider` from the
[voxel-engine](https://github.com/maxogden/voxel-engine) instance `game`.

## var spider = createSpider()

Create a `spider`.

## spider.move(x, y, z)

Move a relative amount by modifying the velocity.

# attributes

## spider.rotation

Control the rotation about the `x`, `y`, and `z` axis by updating
`spider.rotation.x`, `spider.rotation.y`, and `spider.rotation.z` in radians.

## spider.position

Update the spider position by setting `x`, `y`, and `z` attributes.

# install

With [npm](https://npmjs.org) do:

```
npm install voxel-spider
```

# license

MIT
