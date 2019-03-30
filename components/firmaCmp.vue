<template>

  <div>
    <!--<button id="showFirma" v-on:click="showFirma">Muestra Firma</button>-->

    <!--<p>BASE64: {{firmaPngBase64}}</p>
    <img v-bind:src="firmaPngBase64" width="500" height="100" />-->

    <div>
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

      <!--<canvas name="SigImg" id="SigImg" width="500" height="100"></canvas>-->
      <!-- v-show="seFirmo" -->
      <div>

        <!--<input id="SignBtn" name="SignBtn" type="button" value="FIRMAR" onclick="javascript:onSign()" />--> <!--&nbsp;&nbsp;&nbsp;&nbsp;-->
        <button id="SignBtn" name="SignBtn" v-on:click="iniciarFirma()">INICIAR FIRMA</button>

        <!--<input id="button1" name="ClearBtn" type="button" value="LIMPIAR" onclick="javascript:onClear()" />--><!--&nbsp;&nbsp;&nbsp;&nbsp-->
<!-- Se dehabilitó este botón por que al iniciar firma ya incluye limpiar firma -->
        <!--<button id="button1" name="ClearBtn" v-on:click="limpiarFirma()">LIMPIAR</button>-->

        <!--<input id="button2" name="DoneBtn" type="button" value="Done" onclick="javascript:onDone()" />--><!--&nbsp;&nbsp;&nbsp;&nbsp-->
        <button id="button2" name="DoneBtn" v-on:click="aceptarFirma()">ACEPTAR FIRMA</button>

        <!--<textarea id="xfirmaBase64" name="xfirmaBase64" style="display:none;">HOLA TEXTAREA</textarea>-->


      </div>


    </div>

  </div>
</template>

<script>


  export default {
    name: 'Firma',
    components: {
    },
    data() {
      return {
        tituloPagina: 'Firma',
        firmaBase64: '',
        ancho: 500,
        alto: 100,
      }
    },

    computed: {
      firmaPngBase64: function () {
        return "data: image/png;base64," + this.$store.state.firmaBase64;
      },
      seFirmo: function () {
        return !(this.$store.state.firmaBase64 === '');
      },
    },

    watch: {
      seFirmo: function () {
          console.log((this.seFirmo ? 'FIRMADO!' : "NO FIRMADO"));
      },
    },

    created() {
      this.$store.commit('setFirmaBase64', '');
    },

    mounted() {
      //console.log('textarea=', document.DATA.firmaBase64.value);
      console.log('\r\n\r\n\r\n 1.- ==============>>>>  la firma base64 es', this.firmaBase64);
      let scriptSigWeb = document.createElement('script');
      scriptSigWeb.setAttribute('src', 'SigWebTablet.js');
      document.head.appendChild(scriptSigWeb);

      let scriptSigWebController = document.createElement('script');
      scriptSigWebController.setAttribute('src', 'SigWebTabletController.js');
      document.head.appendChild(scriptSigWebController);

      //window.onunload = window.onbeforeunload = (function () {
      //  //this.closingSigWeb();
      //  ClearTablet();
      //  SetTabletState(0, tmr);
      //});


      //let link = document.createElement('link');
      //link.rel = 'stylesheet';
      //link.type = 'text/css';
      //link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
      //document.head.appendChild(link);

      //let script1 = document.createElement('script');
      //script1.setAttribute('src', 'https://code.jquery.com/jquery-3.3.1.slim.min.js');
      //document.head.appendChild(script1);

      //let script2 = document.createElement('script');
      //script2.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js');
      //document.head.appendChild(script2);

      //let script3 = document.createElement('script');
      //script3.setAttribute('src', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js');
      //document.head.appendChild(script3);

    },
    
    methods: {

      showFirma: function () {
        //this.firmaPngBase64 = "data: image/png;base64," + this.firmaBase64;
        console.log('****************',this.firmaPngBase64,"<<== FIRMAPNGBASE64");
      }, 

      getController: function () {
        console.log('en GETcontroller:', controller());
      },

      iniciarFirma: function () {
        this.limpiarFirma();
        onSign();
      },

      limpiarFirma: function () {
        this.firmaBase64 = '';
        this.$store.commit('setFirmaBase64', '');
        onClear();
      },

      aceptarFirma: function () {        
        onDone(this.callbackOnDone);
        
        onClear();
        onSign();
        

      },

      callbackOnDone: function (imgBase64) {

        this.$store.commit('setFirmaBase64', imgBase64);
        console.log('en callbackOnDone this.$store.state.setFirmaBase64=', this.$store.state.firmaBase64);
        
      }
    }
  }
</script>

