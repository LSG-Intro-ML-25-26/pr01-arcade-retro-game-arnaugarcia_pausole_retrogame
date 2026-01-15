//  #INICI
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 500, false)
})
function show_leaderboard() {
    let empty_msg: TextSprite;
    let i: number;
    let score_val: number;
    let row: TextSprite;
    
    prepare_transition()
    scene2 = 2
    score_title = textsprite.create("TOP 5 PUNTUACIONS", 0, 3)
    score_title.setPosition(80, 15)
    score_title.setKind(SpriteKind.Text)
    let scores = settings.readNumberArray("high_scores")
    if (!scores) {
        empty_msg = textsprite.create("No hi ha dades", 0, 2)
        empty_msg.setPosition(80, 60)
        empty_msg.setKind(SpriteKind.Text)
    } else {
        i = 0
        while (i <= scores.length - 1) {
            score_val = scores[i]
            row = textsprite.create("" + ("" + (i + 1)) + ". " + ("" + ("" + score_val)), 0, 2)
            row.setPosition(80, 35 + i * 15)
            row.setKind(SpriteKind.Text)
            i += 1
        }
    }
    
    score_back = textsprite.create("PREM B PER TORNAR", 0, 3)
    score_back.setPosition(80, 105)
    score_back.setKind(SpriteKind.Text)
}

//  # OVERLAP
sprites.onOverlap(SpriteKind.Player, SpriteKind.Text, function on_on_overlap(sprite2: Sprite, otherSprite2: Sprite) {
    if (otherSprite2 == play) {
        sprite2.sayText("Prem A per jugar", 100, false)
        if (controller.A.isPressed()) {
            start_game()
        }
        
    } else if (otherSprite2 == leaderboard) {
        sprite2.sayText("Prem A per veure les puntuacions", 100, false)
        if (controller.A.isPressed()) {
            show_leaderboard()
        }
        
    } else {
        sprite2.sayText("Prem A per veure la historia", 100, false)
        if (controller.A.isPressed()) {
            start_story()
        }
        
    }
    
})
//  # FUNCIONS
//  ## CANVI DE PANTALLES
function start_menu() {
    
    scene2 = 0
    scene.setBackgroundImage(assets.image`
        start_bg
        `)
    title = textsprite.create("TREASURE ESCAPE", 0, 2)
    title.setMaxFontHeight(9)
    play = textsprite.create("JUGAR")
    story = textsprite.create("HISTORIA")
    leaderboard = textsprite.create("PUNTUACIONS")
    title.setPosition(80, 10)
    play.setPosition(80, 40)
    story.setPosition(35, 90)
    leaderboard.setPosition(120, 90)
    play.setKind(SpriteKind.Text)
    story.setKind(SpriteKind.Text)
    play.setFlag(SpriteFlag.Ghost, false)
    story.setFlag(SpriteFlag.Ghost, false)
    leaderboard.setFlag(SpriteFlag.Ghost, false)
    nena = sprites.create(assets.image`
        nena-front
        `, SpriteKind.Player)
    controller.moveSprite(nena)
    nena.setStayInScreen(true)
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 500, false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 500, false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (scene2 == 1 && nena.y >= ground_y) {
        nena.vy = -260
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    if (scene2 == 2) {
        prepare_transition()
        start_menu()
    }
    
})
function prepare_transition() {
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
}

//  ## PUNTUACIONS
function save_score(new_score: number) {
    let scores2 = settings.readNumberArray("high_scores")
    if (!scores2) {
        scores2 = []
    }
    
    scores2.push(new_score)
    scores2.sort()
    scores2.reverse()
    scores2 = scores2.slice(0, 5)
    settings.writeNumberArray("high_scores", scores2)
}

function start_game() {
    
    prepare_transition()
    scene2 = 1
    scene.setBackgroundImage(assets.image`
        game_bg
        `)
    info.setLife(2)
    info.setScore(0)
    nena = sprites.create(assets.image`
        nena-front
        `, SpriteKind.Player)
    nena.setPosition(20, ground_y)
    nena.ay = 600
    nena.setStayInScreen(true)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite3: Sprite, otherSprite3: Sprite) {
    
    otherSprite3.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    if (info.life() <= 0 && already_scored == false) {
        already_scored = true
        save_score(info.score())
    }
    
})
function start_story() {
    prepare_transition()
    scene.setBackgroundImage(assets.image`
        placeholder1
        `)
    game.showLongText("TEXT 1", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`
        placeholder2
        `)
    game.showLongText("TEXT 2", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`
        palceholder3
        `)
    game.showLongText("TEXT 3", DialogLayout.Bottom)
    start_menu()
}

//  Fet per Arnau Garcia i Pau Sole
//  # INPUTS
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
    if (scene2 == 1 && nena.y >= ground_y) {
        nena.vy = -260
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_on_overlap3(sprite: Sprite, otherSprite: Sprite) {
    otherSprite.destroy()
    info.changeScoreBy(50)
})
let obstacle2 : Sprite = null
let coin : Sprite = null
let coin_img : Image = null
let random_obstacle = 0
let random_coin = 0
let already_scored = false
let story : TextSprite = null
let title : TextSprite = null
let leaderboard : TextSprite = null
let play : TextSprite = null
let score_back : TextSprite = null
let score_title : TextSprite = null
let scene2 = 0
let nena : Sprite = null
let ground_y = 0
let obstacle = null
ground_y = 100
let score_to_win = 5000
start_menu()
//  # UPDATES
game.onUpdate(function on_on_update() {
    if (scene2 != 1) {
        return
    }
    
    info.changeScoreBy(1)
    if (info.score() >= score_to_win) {
        save_score(info.score())
        game.over(true)
    }
    
    if (nena.y > ground_y) {
        nena.y = ground_y
        nena.vy = 0
    }
    
})
game.onUpdateInterval(5000, function on_update_interval() {
    
    if (scene2 != 1) {
        return
    }
    
    random_coin = randint(1, 3)
    if (random_obstacle == 1) {
        coin_img = assets.image`
            coin_1
            `
    } else if (random_obstacle == 2) {
        coin_img = assets.image`
            coin_2
            `
    } else {
        coin_img = assets.image`
            coin_3
            `
    }
    
    coin = sprites.create(coin_img, SpriteKind.Food)
    coin.setPosition(160, 60)
    coin.vx = -80
    coin.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(1500, function on_update_interval2() {
    let obs_img: Image;
    
    if (scene2 != 1) {
        return
    }
    
    random_obstacle = randint(1, 3)
    if (random_obstacle == 1) {
        obs_img = assets.image`
            obstacle_1
            `
    } else if (random_obstacle == 2) {
        obs_img = assets.image`
            obstacle_2
            `
    } else {
        obs_img = assets.image`
            obstacle_3
            `
    }
    
    obstacle2 = sprites.create(obs_img, SpriteKind.Enemy)
    obstacle2.setPosition(160, ground_y)
    obstacle2.vx = -80
    obstacle2.setFlag(SpriteFlag.AutoDestroy, true)
})
