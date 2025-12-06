ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.font',
    'game.levels.dorm1',
    'game.levels.dorm2'
)
.defines(function(){

MyGame = ig.Game.extend({
    
    // Game gravity
    gravity: 300,
    
    // Font for UI
    font: new ig.Font('media/04b03.font.png'),
    
    init: function() {
        // Bind keyboard controls
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.X, 'jump');
        ig.input.bind(ig.KEY.C, 'shoot');
        ig.input.bind(ig.KEY.TAB, 'switch');
        
        // Load first level
        this.loadLevel(LevelDorm1);
    },
    
    update: function() {
        // Make camera follow player
        var player = this.getEntitiesByType(EntityPlayer)[0];
        if(player) {
            this.screen.x = player.pos.x - ig.system.width/2;
            this.screen.y = player.pos.y - ig.system.height/2;
        }
        
        // Update all entities and background maps
        this.parent();
    },
    
    draw: function() {
        // Draw all entities and background maps
        this.parent();
        
        // Draw HUD
        var player = this.getEntitiesByType(EntityPlayer)[0];
        if(player) {
            this.font.draw('Health: ' + player.health, 10, 10);
            this.font.draw('Weapon: ' + (player.weapon === 0 ? 'Gun' : 'Grenade'), 10, 25);
        }
    }
});

// Start the game with 60fps, 320x240 resolution, scaled up by 2
ig.main('#canvas', MyGame, 60, 320, 240, 2);

});
