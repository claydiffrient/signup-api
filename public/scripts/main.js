//Main file for the tennis signup.

var URL = "http://dry-falls-5646.herokuapp.com";

var slots = {};
var globalPeople = {};
$(document).ready(function()
{
   updateTable();
   $("#signupModal #signUpSave").on('click', function(e)
   {
      var slot = {};
      slot.people = [];
      var dbid = $("#signupModal #db_id").val();
      slot.people.push({
         'name': $("#signupModal #signUpName").val(),
         'team': $("#signupModal #signUpTeam").val()
      });
      $(globalPeople[dbid]).each(function(k,v)
      {
         slot.people.push(v);
      });
      slot.title = $("#signupModal #slotName").val();
      slot.limit = $("#signupModal #slotLimit").val();
      slot.time = $("#signupModal #slotTime").val();
      $.ajax({
         url: '/slots/' + dbid,
         type: 'PUT',
         data: slot,
      }).done(function(results)
      {
         $('.modal-body').empty();
         $('.modal-body').append("You have been signed up.<br />Contact Clay @ lam06004@byui.edu if you need to change.");
      });
   });

   $("#signupModal").modal({
      keyboard: false,
      backdrop: 'static',
      show: false
   });
});

var updateTable = function()
{
   $.getJSON("/slots", function(data)
   {
      slots = data;
      var toAppend = "<tr><th>Position</th><th>Time</th><th>People/Signup</th></tr>";
      $('#slotTable').empty();
      $(slots).each(function(k,v)
      {
         if (typeof v.people != "undefined")
         {
            globalPeople[v._id] = v.people;
            toAppend += "<tr><td>"+v.title+"</td>";
            toAppend += "<td>"+v.time+"</td>";
            toAppend += "<td>";
            $(v.people).each(function(k2,v2)
            {
               toAppend += v2.name + " (" + v2.team + ")";
               if (k2 != v.people.length)
               {
                  toAppend += ",  ";
               }
            });
            for (var i = 0; i < v.limit - v.people.length; i++)
            {
               toAppend += "<button class='btn btn-primary right' data-time='"+v.time+"' data-limit='"+v.limit+"' data-name='"+v.title+"' data-id='"+v._id+"'>Sign Up</button>";
            }
            toAppend += "</td>";
            toAppend += "</tr>";
         }
         else
         {
            toAppend += "<tr><td>"+v.title+"</td>"
            toAppend += "<td>"+v.time+"</td>";
            toAppend += "<td>";
            for (var i = 0; i < v.limit; i++)
            {
               toAppend += "<button class='btn btn-primary right' data-time='"+v.time+"' data-limit='"+v.limit+"' data-name='"+v.title+"' data-id='"+v._id+"'>Sign Up</button>";
            }
            toAppend += "</td></tr>";
         }
      });
      $('#slotTable').append(toAppend);
      $('#slotTable button').on('click', function(e)
      {
         $("#signupModal #db_id").attr("value", $(e.target).data("id"));
         $("#signupModal #slotName").attr("value", $(e.target).data("name"));
         $("#signupModal #slotTime").attr("value", $(e.target).data("time"));
         $("#signupModal #slotLimit").attr("value", $(e.target).data("limit"));
         $("#signupModal").modal('show');
      });
   });
}