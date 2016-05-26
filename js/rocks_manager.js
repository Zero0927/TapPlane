
define(function(require,exports,module){
    var Sprite = require("./game.js").game.layaClass.Sprite;
    var Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Events = Matter.Events;
    var rock = require("./rock.js");
    var json = require("../res/data/rockteam.json","json");
    var collisionCategory = require("./game.js").game.collisionCategory;
    var timer = Laya.timer;
    
   
    exports.createRocks = function(type,isPhysic){
        var rocks
        if (isPhysic == undefined || isPhysic == false ){
            rocks = Object.create(Sprite); 
        }else{
            rocks = Composite.create();
            createRect();
        }
        
         
        var rockType,rockObject;
        var index = Math.floor(Math.random() * 3);
        var rockArry = json[type][index]["rock"+String(index+1)];
        for (var i = 0,len = rockArry.length;i < len;i++){
            rockType = (rockArry[i].direction == "up")?
                        type:
                        type + "Down";
            
            rockObject = rock.init(rockArry[i].x,rockArry[i].y,rockType,isPhysic);
            if (isPhysic == undefined || isPhysic == false ){
                rocks.addChild(rockObject);
            }else{
                Composite.add(rocks,rockObject);
            }
            
        } 
        rocks._type = type;         
        return rocks;
        
        function createRect(){
            var body = Bodies.rectangle(150,Laya.stage.height/2,1,Laya.stage.height);
            body._pos = {x:body.position.x,y:body.position.y};
            body.collisionFilter.category = collisionCategory.COLLECTABLE;
            body.collisionFilter.mask = collisionCategory.PLAYER;
            Body.setStatic(body, true);
            body.isSensor = true;
            
            body.render.visible = false;
            body._score = 1;
            body.label = "score";
            
            Events.on(body,"collisionStart",function(e){
               if(!require("./game.js").game.isGameEnd &&!body._isCollision){
                   if(e.body.label == "player"){
                       require("./game.js").game.score += body._score;
                       var effect = require("./effect.js").init(e.body.position.x,e.body.position.y,body._score);
                       require("./game.js").game.container.addChild(effect);
                       
                   }                  
                   body._isCollision = true;
                   
               }                                
            });
            Events.on(body, "collisionEnd", function (e) {
                timer.once(5000, module, function () {
                    if (body._isCollision) {
                        body._isCollision = false;
                    }
                });

            });
          
            
            Composite.add(rocks,body);
        }
            
    }
    
});