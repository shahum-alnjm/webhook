        function start() {
        var line = $("#lista").val();
       var daks = $("#gate").val();
		var tar = $("#target").val();
	    if (line.length == 0){
                $.notify({
				      icon: "fa fa-exclamation-triangle",
				      title: "Checking Error.",
				      message: "add some dirs first ."

				  },{
				      type: 'danger',
				      timer: 3000,
				      placement: {
				          from: "top",
				          align: "center"
				      }
				  });	
                document.getElementById('iniciar').disabled = false;
                document.getElementById('lista').disabled = false;
                $('#result').fadeOut(1000);
                status('<i class="fa fa-minus" aria-hidden="true"></i> Invalid List', 'warning');
                return;
            }	  
			if (!tar.match("://")){
                $.notify({
				      icon: "fa fa-exclamation-triangle",
				      title: "Checking Error.",
				      message: "add the target url."

				  },{
				      type: 'danger',
				      timer: 3000,
				      placement: {
				          from: "top",
				          align: "center"
				      }
				  });	
                document.getElementById('iniciar').disabled = false;
                document.getElementById('lista').disabled = false;
                $('#result').fadeOut(1000);
                status('<i class="fa fa-minus" aria-hidden="true"></i> Invalid List', 'warning');
                return;
            }	
			
		/*	if (!tar.match("."))){
                $.notify({
				      icon: "fa fa-exclamation-triangle",
				      title: "dunk!.",
				      message: "where is the tld.? :| "

				  },{
				      type: 'danger',
				      timer: 3000,
				      placement: {
				          from: "top",
				          align: "center"
				      }
				  });	
                document.getElementById('iniciar').disabled = false;
                document.getElementById('lista').disabled = false;
                $('#result').fadeOut(1000);
                status('<i class="fa fa-minus" aria-hidden="true"></i> Invalid List', 'warning');
                return;
            } */
  var check_line = line.split("\n");
  var total = check_line.length;
  var ap = 0;
  var ed = 0;
  var rp = 0;
  var rCredits; 
  check_line.forEach(function(value, index) {
            setTimeout(
                function() {
					var e = daks;
					var gate = daks;
                    $.ajax({
                         url: 'api.php?chk='+ tar +'/'+ value,
                        type: 'GET',
                        async: true,
                        success: function(resultado) {
                            if (resultado.match("HTTP/1.1 200")) {
                                removelinha();
                                ap++;
                                aprovadas('<lv>' + resultado +' - '+ tar +'/'+ value+'</lv><br>');
                            }else if(resultado.match("HTTP/1.1 404")) {
                                removelinha();
                                ed++;
                                edrovadas('<Unknown>'+resultado +' - '+ tar +'/'+ value+'</Unknown><br>');
                           }else if(resultado.match("HTTP/1.1 301") || resultado.match("HTTP/1.1 302")) {
                                removelinha();
                                ap++;
                                aprovadas('<lv>' + resultado +' - '+ tar +'/'+ value+'</lv><br>');
                           }else {
                                removelinha();
                                rp++;
                                reprovadas('<die>' + resultado + " - "+ tar +'/'+ value+'</die><br>');
                            }
                            $('#carregadas').html(total);
                            var fila = parseInt(ap) + parseInt(ed) + parseInt(rp);
                            $('#cLive').html(ap);
                            $('#cWarn').html(ed);
                            $('#cDie').html(rp);
                            $('#total').html(fila);
                            $('#cLive2').html(ap);
                            $('#cWarn2').html(ed);
                            $('#cDie2').html(rp);
                            if (fila == total) {
                            $.notify({
						            icon: 'fa fa-credit-card',
	                        title: "Checking Complete",
				      message: "Have a Good Day."

				  },{
				      type: 'success',
				      timer: 3000,
				      placement: {
				          from: "top",
				          align: "center"
				      }
				  });
               
            }
            return;
        }
                     });
                    }, 3000 * index);
        });
    }
    function aprovadas(str) {
        $(".aprovadas").append(str);
    }
    function reprovadas(str) {
        $("#Dead").append(str);
    }
    function edrovadas(str) {
        $(".edrovadas").append(str);
    }
    function removelinha() {
        var lines = $("#lista").val().split('\n');
        lines.splice(0, 1);
        $("#lista").val(lines.join("\n"));
    }
  function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function hide(dff){
var earrings = document.getElementById(dff);
earrings.style.visibility = 'hidden';
}

function show(dff){
var earrings = document.getElementById(dff);
earrings.style.visibility = 'visible';
}




