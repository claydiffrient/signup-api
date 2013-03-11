var slots;
$(document).ready(function()
{
   $.getJSON("/slots", function(data)
   {
      slots = data;
      var toAppend = "";
      $(slots).each(function(k,v)
      {
         toAppend += "<option value='" + v._id + "'>" + v.title +"</option>";
      });
      $('#slotsToDelete').append(toAppend);
   });
});


$('.createSlotArea button').on('click', function(e)
{
   var request = {};
   request.title = $('#slotTitle').val();
   request.time = $('#slotTime').val();
   request.limit = $('#slotLimit').val();
   request.people = [];
   console.log(request);
   $.post('/slots', request,
      function(data)
      {
         $('#results').empty().append(data);
      });
});

$('.deleteSlotArea button').on('click', function(e)
{
   var id = $('#slotsToDelete').val();
   $.ajax({
      url: '/slots/'+id,
      type: 'DELETE',
      done: function(data)
      {
         $('#results').append(data);
      }
   });
});