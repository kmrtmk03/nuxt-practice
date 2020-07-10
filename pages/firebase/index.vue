<template lang="pug">
  .container
    .page-wrap
      .loading(v-if="isLoading")
        .loading-anim
          span
          span
          span
      .page-inner
        .set
          h2.title SET VALUE TO DB
          form.form-wrap
            .id.text
              label.text-label.id-label(for="id") ID
              input.text-input.id-input#id(type="text" placeholder="ID" v-model="user.id")
            .name.text
              label.text-label.name-label(for="name") NAME
              input.text-input.name-input#name(type="text" placeholder="NAME" v-model="user.name")
            .message.text
              label.text-label.message-label(for="message") MESSAGE
              input.text-input.message-input#message(type="text" placeholder="MESSAGE" v-model="user.message")
            .submit
              label.submit-label(for="submit") SET
              input.submit-input#submit(type="button" v-on:click="GetCount")
        
        .get
          h2.title GET MESSEGE FROM DB
          form.form-wrap
            .id.text
              label.text-label.id-label(for="id") ID
              input.text-input.id-input#id(type="text" placeholder="ID" v-model="input.id")
              span.error(v-if="isErrorGet") 入力が無効です。有効なIDを入力してください。
            .name.text
              label.text-label.name-label(for="name") NAME
              input.text-input.name-input#name(type="text" placeholder="NAME" v-model="input.name")
              span.error(v-if="isErrorGet") 入力が無効です。有効なユーザーネームを入力してください。
            .submit
              label.submit-label(for="get") GET
              input.submit-input#get(type="button" v-on:click="GetMessage")

      .modal(v-if="isModal")
        .modal-inner
          p.modal-text {{titleModal}}
          .modal-set(v-if="isModalSet")
            ul.modal-input
              li Firebase ID :
                span {{dbId}}
              li ID : 
                span {{user.id}}
              li NAME : 
                span {{user.name}}
              li MESSAGE : 
                span {{user.message}}
          .modal-get(v-if="isModalGet")
            p.modal-message  MESSAGE : 
              span {{getMessage}}
          p.modal-button(v-on:click="ToggleModal(false)") BACK
</template>


<script>
import firebase from '@/plugins/firebase'
import 'firebase/firestore'

export default {
  data() {
    return {
      totalNumber: 0,
      user: {
        id: '',
        name: '',
        message: ''
      },
      input: {
        id: '',
        name: ''
      },
      dbId: '',
      titleModal: 'INPUT SUCCESS',
      isModal: false,
      isModalSet: false,
      isModalGet: false,
      getMessage: 'HELLO WORLD',
      isLoading: false,
      isErrorGet: false
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    //DBに値を追加
    OnSubmit() {
      const db = firebase.firestore()
      const _prefix = 'user-'
      const _counter = this.totalNumber + 1
      const _db_id = _prefix + _counter
      let dbUsers = db.collection('user').doc(_db_id)
      dbUsers
        .set({
          id: this.user.id,
          name: this.user.name,
          message: this.user.message
        })
        .then((ref) => {
          this.dbId = _db_id
          this.isLoading = false
          this.ToggleModal(true, 'set')
        })
    },

    //Totalのカウントを+1
    SetCount() {
      const _db = firebase.firestore()
      let dbCount = _db.collection('count').doc('count-0000')
      dbCount
        .update({
          total: this.totalNumber + 1
        })
        .then(ref => {
          // +1した後にDBでデータを追加する処理
          this.OnSubmit()
        })
    },

    //Totalのカウントを取得
    GetCount() {
      this.isLoading = true

      const db = firebase.firestore()
      db.collection('count').doc('count-0000')
        .get()
        .then((doc) => {
          this.totalNumber = doc.data().total

          //取得完了後、Setする処理を呼ぶ
          this.SetCount()
        })
    },

    //Messegeを取得
    GetMessage() {
      const db = firebase.firestore()
      db.collection('user')
        .where('id', '==', this.input.id)
        .where('name', '==', this.input.name)
        .get()
        .then((querySnapshot) => {          
          if(querySnapshot.size != 0) {
            this.isErrorGet = false
            querySnapshot.forEach((doc) => {
              this.getMessage =  doc.data().message
              this.ToggleModal(true, 'get')
            })
          } else {
            console.log("No DATA")
            this.isErrorGet = true
          }
        })
        .catch((error) => {
          console.log("ERROR")
        })
    },

    ToggleModal(_is, _type = '') {
      this.isModal = _is

      if(_type ==  'get') {
        this.titleModal = 'GET SUCCESS'
        this.isModalGet = true
      }
      else if(_type == 'set') {
        this.titleModal = 'SET SUCCESS'
        this.isModalSet = true
      }

      if(!_is) {
        this.user.id = ''
        this.user.name = ''
        this.user.message = ''
        
        this.input.id = ''
        this.input.name = ''

        this.isModalSet = false
        this.isModalGet = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @mixin button($_width, $_colorMain, $_colorHover) {
    display: block;
    background-color: $_colorMain;
    color: $_colorHover;
    border: 1px solid $_colorHover;
    width: $_width;
    padding: 14px 0;
    text-align: center;
    border-radius: 100vw;
    transition: .2s;
    font-weight: bold;

    &:hover {
      background-color: $_colorHover;
      color: $_colorMain;
      transition: .5s;
      cursor: pointer;
    }
  }

  @mixin page_over($_zIndex) {
    width: 100vw;
    height: 100vh;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: $_zIndex;
  }

  .error {
    color: #faa;
  }

  .loading {
    @mixin loadingAnim($_delay) {
      animation-name: loading;
      animation-duration: 1s;
      animation-delay: $_delay;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
    
    @include page_over(10);
    background-color: rgba(0, 0, 0, 0.9);

    &-anim {
      position: absolute;
      left: calc(50% - 35px);
      top: calc(50% - 8px);
      width: 70px;
      display: flex;
      justify-content: space-between;

      > span {
        display: block;
        width: 16px;
        height: 16px;
        background-color: #fff;
        border-radius: 100vw;
        &:nth-child(1) { @include loadingAnim(0); }
        &:nth-child(2) { @include loadingAnim(0.1s); }
        &:nth-child(3) { @include loadingAnim(0.2s); }
      }
    }
  }
  @keyframes loading {
    0% {
      transform: scale(1);
      transform: translateY(0px);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
      transform: translateY(-20px);
    }
    75% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
      transform: translateY(0px);
    }
  }

  .page {
    &-wrap {
      background-color: $keyColor;
      min-height: 100vh;
    }
    &-inner {
      width: 70vw;
      margin: 0 auto;
      padding: 100px 0;
    }
  }

  h1 {
    text-align: center;
    color: #fff;
  }

  .set {
    margin-bottom: 80px;
  }

  .title {
    text-align: center;
    color: #fff;
    font-size: 40px;
  }

  .form-wrap {
    margin-top: 30px;
  }

  .text {
    margin-bottom: 30px;
    > * {
      display: block;
    }
    &-label {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      display: none;
    }
    &-input {
      border: none;
      border-radius: 100vw;
      width: 100%;
      font-size: 16px;
      padding: 14px 1.5vw;

      &:focus {
        border: none;
        outline: none;
        background-color: #ccc;
      }
    }
  }

  .submit {
    margin-top: 30px;
    &-input {
      display: none;
    }
    &-label {
      @include button(100%, $keyColor, #fff);
    }
  }

  .modal {
    background-color: rgba(0, 0, 0, 0.9);
    @include page_over(1);

    &-inner {
      background-color: #fff;
      border-radius: 24px;
      width: 70vw;
      height: 80vh;
      position: absolute;
      top: 10vh;
      left: 15vw;
    }

    &-text {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      padding-top: 20vh;
    }

    &-input {
      width: 50%;
      margin: 50px auto;

      > li {
        font-size: 16px;
        border-bottom: 1px solid #ccc;
        padding: 30px 0 6px;

        > span {
          font-weight: bold;
          margin-left: 20px;
        }
      }
    }

    &-message {
      text-align: center;
      padding: 50px 0;
      font-size: 32px;
    }

    &-button {
      @include button(50%, $keyColor, #ccc);
      margin: 70px auto 0;
    }
  }
</style>