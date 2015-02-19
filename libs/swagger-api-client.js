var client = require("swagger-client")

  var swagger = new client.SwaggerClient({
    url: 'https://demo2.openi-ict.eu/api-spec/v1/simple_auth',
    success: function() {
      console.log( 'swagger works!' );
    },
    failure: function() {
      console.log( 'error in swagger client' );
    }
  });

module.exports.login = swagger.apis.simple_auth.login({username:'sse',password:'1qay2wsx'});