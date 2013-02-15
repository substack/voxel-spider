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
    abdomen.position.set(0, 10, 0);
    body.add(abdomen);
    
    var head = new T.Mesh(
        new T.CubeGeometry(5, 5, 5),
        new T.MeshLambertMaterial({
            color: 0x200830,
            ambient: 0x200830
        })
    );
    head.position.set(0, 8, 7.5);
    body.add(head);
    
    var legs = [];
    for (var side = 0; side <= 1; side++) {
        for (var i = 0; i < 4; i++) {
            var leg = new T.Object3D;
            leg.position.z = i * 1.5;
            leg.state = i % 2;
            leg.position.y = leg.state + 3;
            
            legs.push(leg);
            body.add(leg);
            
            var horiz = new T.Mesh(
                new T.CubeGeometry(5, 1, 1),
                new T.MeshLambertMaterial({
                    color: 0x200830,
                    ambient: 0x200830
                })
            );
            horiz.position.x = 7.5 - side * 15;
            horiz.position.y = 4;
            leg.add(horiz);
            
            var vert = new T.Mesh(
                new T.CubeGeometry(1, 5, 1),
                new T.MeshLambertMaterial({
                    color: 0x200830,
                    ambient: 0x200830
                })
            );
            vert.position.x = 10 - side * 20;
            vert.position.y = 1.5;
            leg.add(vert);
        }
    }
    setInterval(function () {
        legs.forEach(function (leg) {
            leg.state = !leg.state;
            leg.position.y = leg.state + 3;
        });
    }, 100);
    
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
