
  var arr = [];
  var newArr = [];
  var insertHere = document.getElementById('here');
  var table = document.createElement('tbody');
  var inputBox = document.getElementById("inp");
  var randName = document.getElementById("random");
  
  document.getElementById("addNamesBtn").addEventListener("click",function() {
    if(!inputBox.value){return}
    var names = inputBox.value;
    inputBox.value = '';
    newArr = names.split(',');
    newArr = newArr.map(function(word){
      return word.trim()
    })
    console.log(newArr);
    arr = arr.concat(newArr);
    display();
  });

  document.getElementById("pickRandom").addEventListener("click",function(){
    randName.innerHTML = '';
    var randNum = Math.floor(Math.random()*arr.length);
    var heading = document.createElement('h1');
    var text = document.createTextNode(arr[randNum]);
    randName.appendChild(heading).appendChild(text);

  })

  

  function display(){
    table.innerHTML = '';
    for (var i = 0; i < arr.length; i ++){
      var row = document.createElement('tr');
      var cell = document.createElement('td');
      var text = document.createTextNode(arr[i]);
      console.log(text);
      cell.appendChild(text);
      row.appendChild(cell);
      table.appendChild(row);
    }
    insertHere.appendChild(table);

  }



