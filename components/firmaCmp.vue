<template>

  <div >
    <button id="window" v-on:click="getWindow">window</button>
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
      <table border="1" cellpadding="0" width="100">
        <tbody>
          <tr>
            <td height="50" width="100">
              <canvas id="cnv" name="cnv" width="100" height="50"></canvas>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <canvas name="SigImg" id="SigImg" width="500" height="100"></canvas>


      <form action="#" name=FORM1>
        <p>
          <input id="SignBtn" name="SignBtn" type="button" value="Sign" onclick="javascript:onSign()" /> <!--&nbsp;&nbsp;&nbsp;&nbsp;-->
          <!--<button id="SignBtn" name="SignBtn" v-on:click="onSign()">Sign</button>-->

          <input id="button1" name="ClearBtn" type="button" value="Clear" onclick="javascript:onClear()" /><!--&nbsp;&nbsp;&nbsp;&nbsp-->
          <!--<button id="button1" name="ClearBtn" v-on:click="onClear()">Clear</button>-->

          <input id="button2" name="DoneBtn" type="button" value="Done" onclick="javascript:onDone()" /><!--&nbsp;&nbsp;&nbsp;&nbsp-->
          <!--<button id="button2" name="DoneBtn" v-on:click="onDone()">Done</button>-->

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

      getWindow: function () {
        console.log('en GETWINDOW:', isX());
        this.getController();
        SigImageCallback('EJEMPLO DE BASE64....');
      },
      getController: function () {
        console.log('en GETcontroller:', controller());
      },

    }
  }
</script>

