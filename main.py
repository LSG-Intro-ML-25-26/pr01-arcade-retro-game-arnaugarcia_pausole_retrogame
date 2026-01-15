# #INICI

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def show_leaderboard():
    global scene2, score_title, score_back
    prepare_transition()
    scene2 = 2
    score_title = textsprite.create("TOP 5 PUNTUACIONS", 0, 3)
    score_title.set_position(80, 15)
    score_title.set_kind(SpriteKind.text)
    scores = settings.read_number_array("high_scores")
    if not (scores):
        empty_msg = textsprite.create("No hi ha dades", 0, 2)
        empty_msg.set_position(80, 60)
        empty_msg.set_kind(SpriteKind.text)
    else:
        i = 0
        while i <= len(scores) - 1:
            score_val = scores[i]
            row = textsprite.create("" + str((i + 1)) + ". " + ("" + str(score_val)), 0, 2)
            row.set_position(80, 35 + i * 15)
            row.set_kind(SpriteKind.text)
            i += 1
    score_back = textsprite.create("PREM B PER TORNAR", 0, 3)
    score_back.set_position(80, 105)
    score_back.set_kind(SpriteKind.text)
# # OVERLAP

def on_on_overlap(sprite2, otherSprite2):
    if otherSprite2 == play:
        sprite2.say_text("Prem A per jugar", 100, False)
        if controller.A.is_pressed():
            start_game()
    elif otherSprite2 == leaderboard:
        sprite2.say_text("Prem A per veure les puntuacions", 100, False)
        if controller.A.is_pressed():
            show_leaderboard()
    else:
        sprite2.say_text("Prem A per veure la historia", 100, False)
        if controller.A.is_pressed():
            start_story()
sprites.on_overlap(SpriteKind.player, SpriteKind.text, on_on_overlap)

# # FUNCIONS
# ## CANVI DE PANTALLES
def start_menu():
    global scene2, title, play, story, leaderboard, nena
    scene2 = 0
    scene.set_background_image(assets.image("""
        start_bg
        """))
    title = textsprite.create("TREASURE ESCAPE", 0, 2)
    title.set_max_font_height(9)
    play = textsprite.create("JUGAR")
    story = textsprite.create("HISTORIA")
    leaderboard = textsprite.create("PUNTUACIONS")
    title.set_position(80, 10)
    play.set_position(80, 40)
    story.set_position(35, 90)
    leaderboard.set_position(120, 90)
    play.set_kind(SpriteKind.text)
    story.set_kind(SpriteKind.text)
    play.set_flag(SpriteFlag.GHOST, False)
    story.set_flag(SpriteFlag.GHOST, False)
    leaderboard.set_flag(SpriteFlag.GHOST, False)
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

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_a_pressed():
    if scene2 == 1 and nena.y >= ground_y:
        nena.vy = -260
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    if scene2 == 2:
        prepare_transition()
        start_menu()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def prepare_transition():
    sprites.destroy_all_sprites_of_kind(SpriteKind.text)
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
# ## PUNTUACIONS
def save_score(new_score: number):
    scores2 = settings.read_number_array("high_scores")
    if not (scores2):
        scores2 = []
    scores2.append(new_score)
    scores2.sort()
    scores2.reverse()
    scores2 = scores2.slice(0, 5)
    settings.write_number_array("high_scores", scores2)
def start_game():
    global scene2, nena
    prepare_transition()
    scene2 = 1
    scene.set_background_image(assets.image("""
        game_bg
        """))
    info.set_life(2)
    info.set_score(0)
    nena = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    nena.set_position(20, ground_y)
    nena.ay = 600
    nena.set_stay_in_screen(True)

def on_on_overlap2(sprite3, otherSprite3):
    global already_scored
    otherSprite3.destroy()
    info.change_life_by(-1)
    scene.camera_shake(4, 500)
    if info.life() <= 0 and already_scored == False:
        already_scored = True
        save_score(info.score())
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

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
# Fet per Arnau Garcia i Pau Sole
# # INPUTS

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
    if scene2 == 1 and nena.y >= ground_y:
        nena.vy = -260
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap3(sprite, otherSprite):
    otherSprite.destroy()
    info.change_score_by(50)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap3)

obstacle2: Sprite = None
coin: Sprite = None
coin_img: Image = None
random_obstacle = 0
random_coin = 0
already_scored = False
story: TextSprite = None
title: TextSprite = None
leaderboard: TextSprite = None
play: TextSprite = None
score_back: TextSprite = None
score_title: TextSprite = None
scene2 = 0
nena: Sprite = None
ground_y = 0
obstacle = None
ground_y = 100
score_to_win = 5000
start_menu()
# # UPDATES

def on_on_update():
    if scene2 != 1:
        return
    info.change_score_by(1)
    if info.score() >= score_to_win:
        save_score(info.score())
        game.over(True)
    if nena.y > ground_y:
        nena.y = ground_y
        nena.vy = 0
game.on_update(on_on_update)

def on_update_interval():
    global random_coin, coin_img, coin
    if scene2 != 1:
        return
    random_coin = randint(1, 3)
    if random_obstacle == 1:
        coin_img = assets.image("""
            coin_1
            """)
    elif random_obstacle == 2:
        coin_img = assets.image("""
            coin_2
            """)
    else:
        coin_img = assets.image("""
            coin_3
            """)
    coin = sprites.create(coin_img, SpriteKind.food)
    coin.set_position(160, 60)
    coin.vx = -80
    coin.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(5000, on_update_interval)

def on_update_interval2():
    global random_obstacle, obstacle2
    if scene2 != 1:
        return
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
game.on_update_interval(1500, on_update_interval2)
