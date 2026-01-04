controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Text, function (sprite, otherSprite) {
    if (otherSprite == play) {
        sprite.sayText("Prem A per jugar", 100, false)
    } else {
        sprite.sayText("Prem A per veure la historia", 100, false)
    }
})
let story: TextSprite = null
let play: TextSprite = null
let title: TextSprite = null
let nena: Sprite = null
start_menu()
