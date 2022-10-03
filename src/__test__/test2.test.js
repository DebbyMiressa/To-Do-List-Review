/**
 * @jest-environment jsdom
 */
/* eslint-disable*/

import ToDoList from '../todolist.js'
import taskStatus from '../taskstatus.js'
import './test1.test.js'
let tdl = new ToDoList();
let ts = new taskStatus();

function simulateClick(index) {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  const cb = document.getElementById(`checker${index}`);
  cb.dispatchEvent(event);
}

function simulateBtnClick() {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  const cb = document.querySelector('.clr');
  cb.dispatchEvent(event);
}


describe('Testing Edit, Update and Clear', () => {
  
  // Add task item with description text = "Task1"
  let index = 0;
  let firstTask = document.querySelector('.InputText');    
  tdl.addTask(firstTask.value, index);
  tdl.todolist = tdl.getList();
  tdl.displayList();

  it('Test 1: Edit Task Description Function', () => {

    //Assign => Assign index to 0 (initial list item)
    let index = 0;

    // Act => Edit text to "newValue"
    const updatedInput = document.querySelector(`#lists${index}`);
    updatedInput.value = 'newValue';
    tdl.todolist[0].description = updatedInput.value;
    tdl.updateTask(tdl.todolist);
    tdl.todolist = tdl.getList();

    //Assert => expected - text = "newValue"
    //          recieved - the description of the todolist array variable at specific index
    expect(tdl.todolist[index].description).toBe('newValue');
  })

  it('Test 2: test updating completed attribute inside todolist array', () => {

    //Assign => Assign index to 0 (initial list item)
    let index = 0;
    // Act => simulate clicking the checkbox to make it checked and update the local storage
    ts.update();
    simulateClick(index);
    tdl.todolist = tdl.getList();

    //Assert => expected - text = true
    //          recieved - the completed attribute of an object inside a specific index of todolist array = true  
    expect(tdl.todolist[index].completed).toBe(true);
  })

  it('Test 3: test clear all completed', () => {

    //Assign

    // Act => simulate clicking the clear button to delete all checked tasks
    ts.clear();
    simulateBtnClick();

    //Assert => expected - count = 0
    //          recieved - count of checkbox which are checked
    const checkboxes = document.querySelectorAll('.checker');
    let count = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked === true) {
        count += 1;
      }
    });
    expect(count).toBe(0);
  })
});
