var texture = require('voxel-texture');

module.exports = function (game) {
    return function () {
        return new Spider(game);
    };
};

function Spider (game) {
    this.game = game;
    var T = game.THREE;
    this.mesh = new T.Mesh(
        new T.CubeGeometry(10, 10, 10),
        new T.MeshLambertMaterial({
            color: 0x200830,
            ambient: 0x200830
        })
    );
    this.mesh.position.y = 200;
    game.addItem(this);
}

Spider.prototype.turn = function (delta) {
    this.mesh.rotation.y += delta;
};
