/**
 * Created by dconway on 23/03/15.
 */


var subscription

var subToDiv = function(context){

   var html = '<div class="contextInstance">';

   for ( var i in context){
      html += '<div  class="nvp"><span class="nvp_name">' + i + '</span><span class="nvp_value"  nvp_name="' + i + '">: ' + context[i] + '</span></div>'
   }

   html += '</div>';

   return html
};

$('#buildSub').click(function(){

   var entry = {
      "cloudletid"         : $('#cloudletID').val(),
      "typeid"             : $('#typeID').val(),
      "objectid"           : $('#objectID').val(),
      "notification_type"  : $(':selected', '#notifType').attr('key')
   };

   if ( !$(".endpoint").hasClass('hidden') ) {
      entry["endpoint"] = $("#endpoint").val();
   }

   subscription=entry;

   //$('#subObject').append(subToDiv(entry))

   $("#subObject").html(  JSON.stringify(entry,     undefined, 2));

});

$('#notifType').click(function() {

   console.log( $('#notifType').val() );

   if ($('#notifType').val() === "Android Notification") {

      $("#endpointLabel").text("Android Device ID");
      $(".endpoint").removeClass('hidden')
}
   else{
      $(".endpoint").addClass('hidden')
   }

});


$('#createSub').click(function() {

   var sessionToken = $("#session").val()

   $.ajax({
      url: '/api/v1/subscription',
      type: 'post',
      data: JSON.stringify(subscription),
      headers: {
         "Authorization" : sessionToken,
         "Content-Type": "application/json"
      },
      dataType: 'json',
      success: function (data) {
         $("#dialog-modal").html('<pre>PEAT Type created: ' + data['@id'] + '</pre>');
         $("#dialog-modal").dialog( { "title" : data['@id'] + ' created' } );
         $("#dialog-modal").dialog("open");
      },
      error: function (data) {
         $("#dialog-modal").html('<pre>Error:' +  data.responseJSON.error + '</pre>');
         $("#dialog-modal").dialog( { "title" : 'Error' } );
         $("#dialog-modal").dialog("open");
      }
   });

});
