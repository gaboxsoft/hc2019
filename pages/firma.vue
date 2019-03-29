
<template>
  <div>
    <!--<div>
      <h2 class="text-primary text-center">{{tituloPagina}}</h2>
    </div>-->
    <div>
      <button id="window" v-on:click="getWindow">window</button>
      <table border="1" cellpadding="0" width="500">
        <tbody>
          <tr>
            <td height="100" width="500">
              <canvas id="cnv" name="cnv" width="500" height="100"></canvas>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <canvas name="SigImg" id="SigImg" width="500" height="100"></canvas>



      <form action="#" name=FORM1>
        <p>
          <!--<input id="SignBtn" name="SignBtn" type="button" value="Sign" onclick="onSign()" />&nbsp;&nbsp;&nbsp;&nbsp;-->
          <button id="SignBtn" name="SignBtn" v-on:click="onSign">Sign</button>

          <!--<input id="button1" name="ClearBtn" type="button" value="Clear" onclick="onClear()" />&nbsp;&nbsp;&nbsp;&nbsp-->
          <button id="button1" name="ClearBtn" v-on:click="onClear">Clear</button>

          <!--<input id="button2" name="DoneBtn" type="button" value="Done" onclick="onDone()" />&nbsp;&nbsp;&nbsp;&nbsp-->
          <button id="button2" name="DoneBtn" v-on:click="onDone">Done</button>

          <input type="hidden" name="bioSigData">
          <input type="hidden" name="sigImgData">
          <br>
          <br>
          <textarea name="sigStringData" rows="20" cols="50">SigString: </textarea>
          <textarea name="sigImageData" rows="20" cols="50">Base64 String: </textarea>
        </p>
      </form>

      <br /><br />
    </div>
  </div>

  <!--<script type="text/javascript" src="SigWebTablet.js"></script>-->
</template>


<script>


  var tmr;

  export default {
    name: 'Firma',
    components: {
    },
    data() {
      return {
        tituloPagina: 'Firma',
      }
    },
    created() {

      // No hay sesion abierta, redirige a login
      //if (this.$store.state.token === 'NONE') {
      //  this.$router.push({ name: 'login' })
      //};
      //this.$store.commit('setEvolucionId', 'NUEVO');
    },
    mounted() {
      let recaptchaScript = document.createElement('script');
      recaptchaScript.setAttribute('src', 'sigWebTablet.js');
      document.head.appendChild(recaptchaScript);
    },
    methods: {

      getWindow: function () {
        console.log('en GETWINDOW:', isX());
      },

      onSign: function () {

        var ctx = document.getElementById('cnv').getContext('2d');
        SetDisplayXSize(500);
        SetDisplayYSize(100);
        SetTabletState(0, tmr);
        SetJustifyMode(0);
        ClearTablet();
        if (tmr == null) {
          tmr = SetTabletState(1, ctx, 50);
        }
        else {
          SetTabletState(0, tmr);
          tmr = null;
          tmr = SetTabletState(1, ctx, 50);
        }
      },

      onClear: function () {
        ClearTablet();
      },

      onDone: function () {
        if (NumberOfTabletPoints() == 0) {
          alert("Please sign before continuing");
        }
        else {
          SetTabletState(0, tmr);
          //RETURN TOPAZ-FORMAT SIGSTRING
          SetSigCompressionMode(1);
          document.FORM1.bioSigData.value = GetSigString();
          document.FORM1.sigStringData.value += GetSigString();
          //this returns the signature in Topaz's own format, with biometric information


          //RETURN BMP BYTE ARRAY CONVERTED TO BASE64 STRING
          SetImageXSize(500);
          SetImageYSize(100);
          SetImagePenWidth(5);
          GetSigImageB64(this.SigImageCallback);
        }
      },

      SigImageCallback: function (str) {
        document.FORM1.sigImageData.value = str;
      },

      closingSigWeb: function () {
        console.log('en closingSigWeb');
        ClearTablet();
        SetTabletState(0, tmr);
      },

      ////////////////////////////////////////////

      //////////////////////////////////////////













    }
  }

</script>

