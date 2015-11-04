'use strict';
(function(){
  $(document).ready(init);
  var currentList = localStorage.contacts ? JSON.parse(localStorage.contacts): [];
  var rows;
  var editing = -1;
  var sortUp = false;
  function init(){
    updateTable();
    $('#save').click(addPerson);
    $(document).on('click','.removePerson',removePerson)
    $(document).on('click','.edit',editContact)
    $('.sort').click(sorter);
  }

  function addPerson(){
    if(editing >= 0){removePerson()}
      else{
        currentList.push({
          name: $('#name').val(),
          phone: $('#phone').val(),
          email: $('#email').val(),
          address: $('#address').val()
        })
      }
      localStorage.contacts = JSON.stringify(currentList);
      updateTable();
    }

    function updateTable(){
      $('.tableBody').empty();
      rows = currentList.map(function(person,index){
        return $('<tr>')
        .append($('<td>').text(person.name))
        .append($('<td>').text(person.phone))
        .append($('<td>').text(person.email))
        .append($('<td>').text(person.address))
        .append($('<td><button class="removePerson removePerson'+(index)+'">Remove</button>'+
          '<button class="edit edit'+index+'">Edit</button></td>'))
      })
      $('.tableBody').append(rows);
    }

    function editContact(event){
      var toEdit =$(this).closest('tr').index();
      editing = toEdit;
      $('#myModal').modal('show');
      $('#name').val(currentList[toEdit].name)
      $('#phone').val(currentList[toEdit].phone)
      $('#email').val(currentList[toEdit].email)
      $('#address').val(currentList[toEdit].address)
    }

    function removePerson(event){
      var toDelete = editing >= 0 ? editing: Number(event.target.className.match(/\d+/)[0]);
      if(editing >=0){
        currentList.splice(toDelete,1,{
          name: $('#name').val(),
          phone: $('#phone').val(),
          email: $('#email').val(),
          address: $('#address').val()
        });
      } else{
        currentList.splice(toDelete,1);
      }
      localStorage.contacts = JSON.stringify(currentList);
      editing = -1;
      updateTable();
    }

    function sorter(){
      var field = $(this).attr('id').replace(/orderBy/,'');
      sortUp = !sortUp;
      currentList.sort(function(a,b){
        return sortUp ? b[field] < a[field] : b[field] > a[field];
      })
      updateTable(); 
    }
  })()

