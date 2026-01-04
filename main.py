def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def start_menu():
    global title, play, story, nena
    scene.set_background_image(assets.image("""
        menu_bg
        """))
    title = textsprite.create("TREASURE ESCAPE", 0, 2)
    title.set_max_font_height(9)
    play = textsprite.create("JUGAR")
    story = textsprite.create("HISTORIA")
    title.set_position(80, 10)
    play.set_position(30, 90)
    story.set_position(120, 90)
    play.set_kind(SpriteKind.text)
    story.set_kind(SpriteKind.text)
    play.set_flag(SpriteFlag.GHOST, False)
    story.set_flag(SpriteFlag.GHOST, False)
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    controller.move_sprite(nena)
    nena.set_stay_in_screen(True)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def start_story():
    title.destroy()
    play.destroy()
    story.destroy()
    nena.set_flag(SpriteFlag.INVISIBLE, True)

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap(sprite, otherSprite):
    if otherSprite == play:
        sprite.say_text("Prem A per jugar", 100, False)
    else:
        sprite.say_text("Prem A per veure la historia", 100, False)
sprites.on_overlap(SpriteKind.player, SpriteKind.text, on_on_overlap)

story: TextSprite = None
play: TextSprite = None
title: TextSprite = None
nena: Sprite = None
start_menu()