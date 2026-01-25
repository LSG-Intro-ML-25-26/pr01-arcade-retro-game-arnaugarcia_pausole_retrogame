// Fet per Arnau Garcia i Pau Sole
// # INPUTS
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 != 1) {
        animation.runImageAnimation(
        nena,
        assets.animation`marcel_walk_up`,
        100,
        false
        )
    } else if (scene2 == 1 && nena.y >= ground_y) {
        nena.vy = -260
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 == 2) {
        prepare_transition()
        start_menu()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 == 1 && nena.y >= ground_y) {
        nena.vy = -260
    }
})
function show_leaderboard () {
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
if (!(scores)) {
        empty_msg = textsprite.create("No hi ha dades", 0, 2)
        empty_msg.setPosition(80, 60)
        empty_msg.setKind(SpriteKind.Text)
    } else {
        i = 0
        while (i <= scores.length - 1) {
            score_val = scores[i]
            row = textsprite.create("" + (i + 1) + ". " + ("" + score_val), 0, 2)
            row.setPosition(80, 35 + i * 15)
            row.setKind(SpriteKind.Text)
            i += 1
        }
    }
    score_back = textsprite.create("PREM B PER TORNAR", 0, 3)
    score_back.setPosition(80, 105)
    score_back.setKind(SpriteKind.Text)
}
// # OVERLAP
sprites.onOverlap(SpriteKind.Player, SpriteKind.Text, function (sprite2, otherSprite2) {
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
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 != 1) {
        animation.runImageAnimation(
        nena,
        assets.animation`marcel_walk_left`,
        100,
        false
        )
    }
})
// # FUNCIONS
// ## CANVI DE PANTALLES
function start_menu () {
    scene2 = 0
    scene.setBackgroundImage(assets.image`start_bg`)
    title = textsprite.create("DUNKIN'ROQUET", 1, 4)
    title.setMaxFontHeight(10)
    play = textsprite.create("JUGAR", 4, 1)
    story = textsprite.create("HISTORIA", 4, 1)
    leaderboard = textsprite.create("PUNTUACIONS", 4, 1)
    title.setPosition(80, 10)
    play.setPosition(80, 84)
    story.setPosition(35, 100)
    leaderboard.setPosition(120, 100)
    play.setKind(SpriteKind.Text)
    story.setKind(SpriteKind.Text)
    play.setFlag(SpriteFlag.Ghost, false)
    story.setFlag(SpriteFlag.Ghost, false)
    leaderboard.setFlag(SpriteFlag.Ghost, false)
    nena = sprites.create(assets.image`marcel_idle`, SpriteKind.Player)
    controller.moveSprite(nena)
    nena.setStayInScreen(true)
}
function prepare_transition () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Text)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
}
// ## PUNTUACIONS
function save_score (new_score: number) {
    let scores2 = settings.readNumberArray("high_scores")
if (!(scores2)) {
        scores2 = []
    }
    scores2.push(new_score)
    scores2.sort()
scores2.reverse()
    scores2 = scores2.slice(0, 5)
settings.writeNumberArray("high_scores", scores2)
}
function start_game () {
    prepare_transition()
    scene2 = 1
    scene.setBackgroundImage(assets.image`correr_bg`)
    info.setLife(3)
    info.setScore(0)
    nena = sprites.create(assets.image`marcel_idle`, SpriteKind.Player)
    nena.setPosition(20, ground_y)
    nena.ay = 600
    nena.setStayInScreen(true)
    animation.runImageAnimation(
    nena,
    assets.animation`marcel_walk_right0`,
    50,
    true
    )
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    otherSprite3.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    if (info.life() <= 0 && already_scored == false) {
        already_scored = true
        save_score(info.score())
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 != 1) {
        animation.runImageAnimation(
        nena,
        assets.animation`marcel_walk_right0`,
        100,
        false
        )
    }
})
function start_story () {
    prepare_transition()
    scene.setBackgroundImage(assets.image`lasalle_bg`)
    game.showLongText("S'HAN ACABAT LES CLASSES", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`correr_bg`)
    game.showLongText("QUINA GANA...", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`rellotge_bg`)
    game.showLongText("SÓN QUASI LES NOU!", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`dunkin_bg`)
    game.showLongText("VAL MÉS QUE M'AFANYI SI VULL ACONSEGUIR UN DONUT", DialogLayout.Bottom)
    start_menu()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2 != 1) {
        animation.runImageAnimation(
        nena,
        assets.animation`marcel_walk_front`,
        100,
        false
        )
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(100)
    if (random_coin == 5 && info.life() < 3) {
        info.setLife(info.life() + 1)
    }
})
let obstacle2: Sprite = null
let random_obstacle = 0
let coin: Sprite = null
let coin_img: Image = null
let random_coin = 0
let already_scored = false
let story: TextSprite = null
let title: TextSprite = null
let leaderboard: TextSprite = null
let play: TextSprite = null
let score_back: TextSprite = null
let score_title: TextSprite = null
let nena: Sprite = null
let scene2 = 0
let ground_y = 0
let obstacle = null
// #INICI
ground_y = 100
let score_to_win = 5000
start_menu()
// # UPDATES
game.onUpdate(function () {
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
game.onUpdateInterval(5000, function () {
    if (scene2 != 1) {
        return
    }
    random_coin = randint(1, 5)
    if (random_coin == 1 || random_coin == 2) {
        coin_img = assets.image`coin_1`
    } else if (random_coin == 3 || random_coin == 4) {
        coin_img = assets.image`coin_2`
    } else {
        coin_img = assets.image`coin_3`
    }
    coin = sprites.create(coin_img, SpriteKind.Food)
    coin.setPosition(160, 60)
    coin.vx = -80
    coin.setFlag(SpriteFlag.AutoDestroy, true)
})
game.onUpdateInterval(1500, function () {
    let obs_img: Image;
if (scene2 != 1) {
        return
    }
    random_obstacle = randint(1, 3)
    if (random_obstacle == 1) {
        obs_img = assets.image`obstacle_1`
    } else if (random_obstacle == 2) {
        obs_img = assets.image`obstacle_2`
    } else {
        obs_img = assets.image`obstacle_3`
    }
    obstacle2 = sprites.create(obs_img, SpriteKind.Enemy)
    obstacle2.setPosition(160, ground_y)
    obstacle2.vx = -80
    obstacle2.setFlag(SpriteFlag.AutoDestroy, true)
})
