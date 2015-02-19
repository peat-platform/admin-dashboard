var client = require("swagger-client")

var swagger = new client.SwaggerClient({
  url: 'https://demo2.openi-ict.eu/api-spec/v1.json',
  success: function() {
    console.log( swagger.apis() );
  }
});