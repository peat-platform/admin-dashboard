

$('#reloadPage').click(function(){
   var total        = $('#total').val()
   var persistPerms = $('#persist_perms').is(':checked')

   window.location.href = window.location.pathname + '?total=' + total + '&persist='+persistPerms
})


$('#downloadTokens').click(function(){

   var client_name = $('#name').val()
   var filename    = client_name + '_tokens.json'
   var text        = $("#tokens").val()
   var pom         = document.createElement('a');

   pom.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
   pom.setAttribute('download', filename);
   pom.click();

})
