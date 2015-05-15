
$(".testLink").mousedown(function(event) {
   switch (event.which) {
   case 1:
   case 2:
      alert('This link has to be opened in an incognito window otherwise ' +
         'your admin login will interfere with the auth page. \n\nPlease right click and open in new incognito window.');
      return false
      break;
   }
   return true;
});