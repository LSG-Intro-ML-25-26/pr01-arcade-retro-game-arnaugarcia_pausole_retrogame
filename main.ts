controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (in_game == 1 && nena.y >= ground_y) {
        nena.vy = -200
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Text, function (sprite2, otherSprite2) {
    if (otherSprite2 == play) {
        sprite2.sayText("Prem A per jugar", 100, false)
        if (controller.A.isPressed()) {
            start_game()
        }
    } else {
        sprite2.sayText("Prem A per veure la historia", 100, false)
        if (controller.A.isPressed()) {
            start_story()
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
function start_menu () {
    in_game = 0
    scene.setBackgroundImage(assets.image`menu_bg`)
    title = textsprite.create("TREASURE ESCAPE", 0, 2)
    title.setMaxFontHeight(9)
    play = textsprite.create("JUGAR")
    story = textsprite.create("HISTORIA")
    title.setPosition(80, 10)
    play.setPosition(30, 90)
    story.setPosition(120, 90)
    play.setKind(SpriteKind.Text)
    story.setKind(SpriteKind.Text)
    play.setFlag(SpriteFlag.Ghost, false)
    story.setFlag(SpriteFlag.Ghost, false)
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    controller.moveSprite(nena)
    nena.setStayInScreen(true)
}
function prepare_transition () {
    title.destroy()
    play.destroy()
    story.destroy()
    sprites.destroy(nena)
}
function start_game () {
    prepare_transition()
    in_game = 1
    scene.setBackgroundImage(assets.image`game_bg`)
    info.setLife(2)
    info.setScore(0)
    nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    nena.setPosition(20, ground_y)
    nena.ay = 350
    nena.setStayInScreen(true)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
function start_story () {
    prepare_transition()
    scene.setBackgroundImage(assets.image`placeholder1`)
    game.showLongText("TEXT 1", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`placeholder2`)
    game.showLongText("TEXT 2", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`palceholder3`)
    game.showLongText("TEXT 3", DialogLayout.Bottom)
    start_menu()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
// Visual feedback
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
})
let obstacle2: Sprite = null
let random_obstacle = 0
let story: TextSprite = null
let title: TextSprite = null
let play: TextSprite = null
let in_game = 0
let nena: Sprite = null
let ground_y = 0
let obstacle = null
ground_y = 100
start_menu()
game.onUpdate(function () {
    if (in_game != 1) {
        return
    }
    info.changeScoreBy(1)
    if (info.score() >= 10000) {
        game.over(true)
    }
    if (nena.y > ground_y) {
        nena.y = ground_y
        nena.vy = 0
    }
})
game.onUpdateInterval(1500, function () {
    let obs_img: Image;
if (in_game != 1) {
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
