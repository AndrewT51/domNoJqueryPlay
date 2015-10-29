
  var arr = [];
  var newArr = [];
  var insertHere = document.getElementById('here');
  var table = document.createElement('tbody');
  var inputBox = document.getElementById("inp");
  var finalTeams = document.getElementById("teamTable");
  
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
    var text = document.createTextNode('Random choice: ' + arr[randNum]);
    randName.appendChild(heading).appendChild(text);

  });

  document.getElementById('performSplit').addEventListener("click",function(){
    finalTeams.innerHTML = '';
    var groupsOf = document.getElementById("groupSplit").value;
    var tempArr = [].concat(arr);
    var randArr = [];
    while(tempArr.length){
      var randNum = Math.floor(Math.random()*tempArr.length);
      var toPush = tempArr[randNum];
      tempArr.splice(randNum,1);
      randArr.push(toPush)
    }
    var groupObj = {};
    var numOfPeople = randArr.length;
    var groupNum = 1;
    while(randArr.length){
      groupObj[groupNum] = [];
      for (var i= 0; i< groupsOf ; i++ ){
        var putInObj = randArr.shift();
        if (putInObj){
        groupObj[groupNum].push(putInObj);
        }
      }
      groupNum++;
    }
    for(group in groupObj){
      var row = document.createElement('tr');
      var teamTitleCell = document.createElement('td');
      var titleText = document.createTextNode('Team '+group+':');
      var theTeamCell = document.createElement('td');
      var teamText = document.createTextNode(groupObj[group]);
      teamTitleCell.appendChild(titleText);
      theTeamCell.appendChild(teamText);
      // theTeamCell.appendTo('hello')
      row.appendChild(teamTitleCell);
      row.appendChild(theTeamCell);
      finalTeams.appendChild(row);

    }
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



