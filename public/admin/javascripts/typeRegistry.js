$(document).ready(function(){
    $(".show").click(function(){
    	console.log('foo')
    	var id = this.id;
    	console.log(id)
        $("#table_" + id).toggle();
    });
});