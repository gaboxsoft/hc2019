var tmr;


function controller() {
  return 'en controller....';
}

function onSign() {
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
}

function onClear() {
  ClearTablet();
}

function onDone(callbackOnDone) {
  if (NumberOfTabletPoints() == 0) {
    alert("POR FAVOR FIRME PARA PODER CONTINUAR...");
  }
  else {
    SetTabletState(0, tmr);
    //RETURN TOPAZ-FORMAT SIGSTRING
    SetSigCompressionMode(1);
    ////document.FORM1.bioSigData.value = GetSigString();
    ////document.FORM1.sigStringData.value += GetSigString();
    //this returns the signature in Topaz's own format, with biometric information


    //RETURN BMP BYTE ARRAY CONVERTED TO BASE64 STRING
    SetImageXSize(500);
    SetImageYSize(100);
    SetImagePenWidth(5);
    GetSigImageB64(SigImageCallback, callbackOnDone);
    
     
  }
}

function SigImageCallback(str) {
  textarea = document.getElementsByName('xfirmaBase64');
  textarea.value = str;
}



window.onunload = window.onbeforeunload = (function () {
  closingSigWeb()
})

function closingSigWeb() {
  ClearTablet();
  SetTabletState(0, tmr);
}

