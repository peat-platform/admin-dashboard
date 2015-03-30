/**
 * Created by dconway on 27/03/15.
 */

$('#aggReq').click(function() {

   var sessionToken = $("#session").val();

   body = $(".aggBody").val();

   $.ajax({
      url: '/api/v1/aggregator',
      type: 'post',
      data: JSON.stringify(),
      headers: {
         "Authorization" : sessionToken,
         "Content-Type": "application/json"
      },
      dataType: 'json',
      success: function (data) {
         $("#dialog-modal").html('<pre>Aggregated Response: ' + JSON.stringify(data) + '</pre>');
         $("#dialog-modal").dialog( { "title" : data['@id'] + ' created' } );
         $("#dialog-modal").dialog("open");
      },
      error: function (data) {
         if (data.responseJSON !== undefined) {
            $("#dialog-modal").html('<pre>Error:' + data.responseJSON.error + '</pre>');
         }
         else{
            $("#dialog-modal").html('<pre>Error: Unknown</pre>');
         }
         $("#dialog-modal").dialog( { "title" : 'Error' } );
         $("#dialog-modal").dialog("open");
      }
   });

});