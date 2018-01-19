var TextTransmitter = (function() {
    var btns;
    var textbox;
    var warningbox;
    var dadoscpf = localStorage.getItem("cpf");
    
    function onTransmitFinish(btn) {
        textbox.focus();
        btn.disabled = false;
        var originalText = btn.innerText;
        btn.innerText = btn.getAttribute('data-quiet-sending-text');
        btn.setAttribute('data-quiet-sending-text', originalText);
    };




    function onClick(e, transmit) {
        console.log("cliquei aqui dois")
        console.log("Enviando : " + payload)
        e.target.disabled = true;
        var originalText = e.target.innerText;
        e.target.innerText = e.target.getAttribute('data-quiet-sending-text');
        e.target.setAttribute('data-quiet-sending-text', originalText);
        var payload = textbox.value;
        if (payload === "") {
          //  onFinish();
            setInterval(function(transmit2) {
                // This will be executed every 5 seconds
                transmit.transmit(Quiet.str2ab(dadoscpf));  
            console.log("Enviando cpf")
            }, 2000);
            return;
        }
        var onFinish = function() { return onTransmitFinish(btn); };
        for (let index = 0; index < 2; index++) {
           // transmit.transmit(Quiet.str2ab(payload));
            console.log("funcao on click 5 vezes ")
            console.log("Enviando : " + payload)
            if(index==1){
                onFinish()
            }
        }
      
    };

    function setupButton(btn) {
        var profilename = btn.getAttribute('data-quiet-profile-name');
        var onFinish = function() { return onTransmitFinish(btn); };
        var transmit = Quiet.transmitter({profile: profilename, onFinish: onFinish, clampFrame: false});
        var transmit2 = Quiet.transmitter({profile: profilename, onFinish: onFinish, clampFrame: false});
        var onBtnClick = function(e) { return onClick(e, transmit); };
        btn.addEventListener('click', onBtnClick, false);


    };

    function onQuietReady() {
        console.log("passei por aqui ")
        for (var i = 0; i < btns.length; i++) {
            setupButton(btns[i]);
            console.log(i)
        }
    };

    function onQuietFail(reason) {
        console.log("quiet failed to initialize: " + reason);
        warningbox.classList.remove("hidden");
        warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
    };

    function onDOMLoad() {
        btns = document.querySelectorAll('[data-quiet-send-text-button]');
        textbox = document.querySelector('[data-quiet-text-input]');
        warningbox = document.querySelector('[data-quiet-send-text-warning]');
        Quiet.addReadyCallback(onQuietReady, onQuietFail);
    };

    document.addEventListener("DOMContentLoaded", onDOMLoad);
})();
