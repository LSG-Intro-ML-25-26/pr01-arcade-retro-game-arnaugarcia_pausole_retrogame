def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_a_pressed():
    if in_game == 1:
        nena.vy = -150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite2, otherSprite2):
    if otherSprite2 == play:
        sprite2.say_text("Prem A per jugar", 100, False)
    else:
        sprite2.say_text("Prem A per veure la historia", 100, False)
        if controller.A.is_pressed():
            start_story()
sprites.on_overlap(SpriteKind.player, SpriteKind.text, on_on_overlap)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def start_menu():
    global in_game, title, play, story, nena
    in_game = 0
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
def prepare_transition():
    title.destroy()
    play.destroy()
    story.destroy()
    sprites.destroy(nena)
def start_game():
    global in_game, nena
    in_game = 1
    scene.set_background_image(assets.image("""
        game_bg
        """))
    info.set_life(2)
    info.set_score(0)
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(20, ground_y)
    nena.ay = 350
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
    prepare_transition()
    scene.set_background_image(assets.image("""
        placeholder1
        """))
    game.show_long_text("TEXT 1", DialogLayout.BOTTOM)
    scene.set_background_image(assets.image("""
        placeholder2
        """))
    game.show_long_text("TEXT 2", DialogLayout.BOTTOM)
    scene.set_background_image(assets.image("""
        palceholder3
        """))
    game.show_long_text("TEXT 3", DialogLayout.BOTTOM)
    start_menu()

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

# Visual feedback

def on_on_overlap2(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
    scene.camera_shake(4, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

obstacle2: Sprite = None
random_obstacle = 0
story: TextSprite = None
title: TextSprite = None
play: TextSprite = None
in_game = 0
nena: Sprite = None
ground_y = 0
obstacle = None
ground_y = 100
start_menu()

def on_on_update():
    if in_game != 1:
        return

    info.change_score_by(1)
    if info.score() >= 10000:
        game.over(True)
    if nena.y > ground_y:
        nena.y = ground_y
        nena.vy = 0
game.on_update(on_on_update)

def on_update_interval():
    if in_game != 1:
            return
            
    global random_obstacle, obstacle2
    random_obstacle = randint(1, 3)
    if random_obstacle == 1:
        obs_img = assets.image("""
            obstacle_1
            """)
    elif random_obstacle == 2:
        obs_img = assets.image("""
            obstacle_2
            """)
    else:
        obs_img = assets.image("""
            obstacle_3
            """)
    obstacle2 = sprites.create(obs_img, SpriteKind.enemy)
    obstacle2.set_position(160, ground_y)
    obstacle2.vx = -80
    obstacle2.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(1500, on_update_interval)
