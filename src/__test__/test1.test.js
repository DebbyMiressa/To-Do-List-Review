/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

import ToDoList from '../todolist.js'
let tdl = new ToDoList();

let list;
let input;

describe('Testing Add and remove', () => {
  
  document.body.innerHTML = `
  <div>
    <ol>
      <li><span>Today's To Do</span><img class="sync" src="7a51210ee31f44c8cd5f.png" alt="sync" id="sync"></li>
      <li><input class="InputText" value="Task1" type="text" placeholder="Add to your list..."><img class="enter" src="23e71aaf97dc09e15144.png" alt="enter" id="enter"></li>
    </ol>
    <ul></ul>
    <button type="button" class="clr">Clear all completed</button>
  </div>
  `;

  it('Test 1: Task Adding Function', () => {

    //Assign => Assign newTask with with input element
    let index = 0;
    let newTask = document.querySelector('.InputText');    

    // Act => Set local storage with newly added text = "Task1"
    tdl.addTask(newTask.value, 0);
    tdl.todolist = tdl.getList();
    tdl.displayList();

    //Assert => expected - text = "Task1"
    //          recieved - input value at specific  index inside the <ul> list
      list = document.querySelector(`#lists${index}`);
      expect(list.value).toBe('Task1');
  })
  it('Test 2: test deleteTask Function', () => {

    //Assign => Get the index of the first task that we want to remove it
    let index = 0;

    // Act => remove task 1 and update the local storage and html file
    tdl.deleteTask(index);
    tdl.todolist = tdl.getList();
    tdl.displayList();

    //Assert => expected - text = undefined
    //          recieved - should be undefined cause of getting value of unexisted element 
      list = document.querySelector(`ul`);
      expect(list.value).toBeUndefined();
  })


});
