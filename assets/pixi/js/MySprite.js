import anime from 'animejs'

export default class MySprite {
  constructor(_fileName, _screenWidth, _screenHeight, _posX, _posY, _moveX, _moveY) {

    //PIXI.jsの設定
    this.PIXI
    if(process.client) {
      this.PIXI = require('pixi.js')
    }
    
    //引数をローカル変数に
    this.fileName = _fileName

    this.screen = {
      width: _screenWidth,
      height: _screenHeight
    }

    this.pos = {
      x: _posX,
      y: _posY
    }

    this.move = {
      x: _moveX,
      y: _moveY
    }

    //Texture読み込み
    this.img = this.fileName
    this.texture = new this.PIXI.Texture.from(this.img)
    this.sprite = new this.PIXI.Sprite(this.texture);

    //Spriteのアンカーポイントを選択
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    //Spriteの位置を決める
    this.SetPosition(this.sprite, this.screen.width * this.pos.x, this.screen.height * this.pos.y)

    //Spriteの大きさ
    this.SetScale(this.sprite, 0.25, 0.25)

    // インタラクションの設定
    this.sprite.interactive = true
    this.sprite.buttonMode = true

    //クリックイベントの設定（thisがよくわからなくなるからアロー関数で）
    this.sprite.on('pointertap', () => {
      this.sprite.interactive = false
      this.FadeOut()
      this.ChangePosition()
    })
  }

  //Spriteを返す
  GetSprite() {
    return this.sprite
  }

  //大きさを設定
  SetScale(_sprite, _x, _y) {
    _sprite.scale.x = _x
    _sprite.scale.y = _y
  }

  //Spriteの位置を変更
  SetPosition(_sprite, _x, _y) {
    _sprite.x = _x
    _sprite.y = _y
  }

  //Spriteを動かす処理
  ChangePosition() {
    //Position
    let pos = {
      x: this.sprite.x,
      y: this.sprite.y
    }

    //移動量
    let amount = {
      x: this.screen.width * (this.move.x / 100),
      y: this.screen.height * (this.move.y / 100)
    }

    anime({
      targets: pos,
      x: pos.x + amount.x,
      y: pos.y + amount.y,
      round: 1,
      easing: 'easeInOutQuad',
      update: () => {
        this.SetPosition(this.sprite, pos.x, pos.y)
      }
    })
  }

  //フェードアウト
  FadeOut() {
    let color = {
      alpha: 1000
    }

    anime({
      targets: color,
      alpha: 0,
      round: 1,
      easing: 'easeInOutQuad',
      update: () => {
        this.sprite.alpha = color.alpha / 1000
      }
    })
  }
}