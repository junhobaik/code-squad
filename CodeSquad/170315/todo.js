var toDoObj = {
  show: function () {
    var listLength = this.toDoList.length;
    for (var i = 0; i < listLength; i++) {
      console.log('- ', this.toDoList[i]);
    }
  }
  , add: function (task) {
    this.toDoList.push(task);
  }
  , del: function (index) {
    this.toDoList.splice(index, 1);
  }
}

function toDo() {
  this.toDoList = [];
}

var allTask = new toDo();
Object.setPrototypeOf(allTask,toDoObj);
console.log("task 1~5 추가");
allTask.add("task 1");
allTask.add("task 2");
allTask.add("task 3");
allTask.add("task 4");
allTask.add("task 5");
allTask.show();
console.log("\n2,3 제거");
allTask.del(1);
allTask.del(2);
allTask.show();