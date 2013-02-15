var texture = require('voxel-texture');
var physical = require('voxel-physical');

module.exports = function (game) {
    return function () {
        return new Spider(game);
    };
};

function Spider (game) {
    this.game = game;
    var T = game.THREE;
    var mesh = new T.Mesh(
        new T.CubeGeometry(10, 10, 10),
        new T.MeshLambertMaterial({
            color: 0x200830,
            ambient: 0x200830
        })
    );
    this.item = game.makePhysical(mesh);
    this.item.yaw.position.y = 200;
    game.scene.add(mesh);
    game.addItem(this.item);
}

Spider.prototype.turn = function (delta) {
    this.item.yaw.rotation.y += delta;
};
