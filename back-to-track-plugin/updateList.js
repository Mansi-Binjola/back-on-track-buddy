$(document).ready(function(){
  $("#displayLinks").on('click','.delbtn',function(){
      $(this).closest('tr').remove();
      var index = $(this).attr('id');
      localStorage.removeItem(index);
      // updateKeys(index);
   });
   /*function updateKeys(index) {
    if(index != localStorage.length){
    for(var i=index;i<localStorage.length;i++){
      localStorage.setItem(i,localStorage.getItem(i+1));
    }
  }
   }*/
});