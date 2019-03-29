<template>

  <div class="bg-danger">
    <!--<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#miFirma">FIRMAR</button>-->
    <!--<div class="modal fade" id="miFirma">
      <div class="modal-dialog">
        <div class="modal-content">-->
    <!-- CABECERA -->
    <!--<div class="modal-header">
      <h4 class="modal-title">F I R M A R</h4>
      <button type="button" class="close" data-dismiss="modal">&times;</button>
    </div>-->
    <!--BODY -->
    <!--<div class="modal-body">-->
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
      <canvas name="SigImg" id="SigImg" width="500" height="100"></canvas>


      <form action="#" name=FORM1>
        <p>
          <!--<input id="SignBtn" name="SignBtn" type="button" value="Sign" onclick="onSign()" />&nbsp;&nbsp;&nbsp;&nbsp;-->
          <button id="SignBtn" name="SignBtn" v-on:click="onSign">Firmar</button>

          <!--<input id="button1" name="ClearBtn" type="button" value="Clear" onclick="onClear()" />&nbsp;&nbsp;&nbsp;&nbsp-->
          <button id="button1" name="ClearBtn" v-on:click="onClear">Limpiar</button>

          <!--<input id="button2" name="DoneBtn" type="button" value="Done" onclick="onDone()" />&nbsp;&nbsp;&nbsp;&nbsp-->
          <button id="button2" name="DoneBtn" v-on:click="onDone">Hecho</button>

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
  <!--</div>-->
  <!-- FOOTER -->
  <!--<div class="modal-footer">
    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cierra</button>
    <button type="button" class="btn btn-primary">Guardar</button>
  </div>-->
  <!--</div>
    </div>
  </div>-->
  </div>
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
    },
    mounted() {

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
          alert("POR FAVOR FIRMA ANTES DE CONTINUAR....");
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


      //  AQUÍ ESTA LA FIRMA EN BASE64
      SigImageCallback: function (str) {
        document.FORM1.sigImageData.value = str;
      },

      closingSigWeb: function () {
        console.log('en closingSigWeb');
        ClearTablet();
        SetTabletState(0, tmr);
      },
    }
  }
</script>

