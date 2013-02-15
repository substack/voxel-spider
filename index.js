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
    
    var body = new T.Object3D;
    
    var abdomen = new T.Mesh(
        new T.CubeGeometry(10, 10, 10),
        new T.MeshLambertMaterial({
            color: 0x200830,
            ambient: 0x200830
        })
    );
    abdomen.position.set(0, 5, 0);
    body.add(abdomen);
    
    var head = new T.Mesh(
        new T.CubeGeometry(5, 5, 5),
        new T.MeshLambertMaterial({
            color: 0x200830,
            ambient: 0x200830
        })
    );
    head.position.set(0, 2.5, 7.5);
    body.add(head);
    
    var dims = new T.Vector3(10, 10, 10);
    var item = this.item = game.makePhysical(body, dims);
    
    item.yaw.position.y = 200;
    item.subjectTo(new T.Vector3(0, -0.00009, 0));
    
    game.scene.add(body);
    game.addItem(item);
}

Spider.prototype.turn = function (delta) {
    this.item.yaw.rotation.y += delta;
};

Spider.prototype.move = function (x, y, z) {
    var T = this.game.THREE;
    if (typeof x === 'object') { y = x.y; z = x.z; x = x.x }
    this.item.velocity.x += x;
    this.item.velocity.y += y;
    this.item.velocity.z += z;
};

Spider.prototype.jump = function () {
    this.item.velocity.y = 10;
}
