

let userinput = document.querySelector('#user-input');
let taskbutton = document.querySelector('.task-button');
let table = document.querySelector('.my-table');
let heading = document.querySelector('.heading')
let tr = document.createElement('tr');
let count = 1;

function counter()  {
      let row = document.querySelectorAll('tr');
      count = 1 ;
      row.forEach((rows , index) => {
            if(index > 0){
                  rows.querySelector('td:first-child').textContent = count++ ;
            }
      })
      return count -1
}


function compleatAndPending() {
      let checkboxes = table.querySelectorAll('input[type="checkbox"]');
      let compleate = 0;
      let pending = 0;

      checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                  compleate++;
            } else {
                  pending++;
            }
      });
      let total = counter()
      heading.textContent = `Total${total} ,  Complete ${compleate}  ,  Pending ${pending}`; 
}


compleatAndPending()



let editingRow = null;
taskbutton.addEventListener('click', (event) => {
      event.preventDefault();

      let input = userinput.value;
      if (input === '') {
            alert('Please fill in the input fields');
      } else {

            if (taskbutton.textContent.trim().toLowerCase() === 'update' && editingRow) {
                  editingRow.querySelector('td:nth-child(2)').textContent = input;
                  taskbutton.textContent = 'Add'; 
                  editingRow = null; 
            } else {

                  let tr = document.createElement('tr');

                  let tdCount = document.createElement('td');
                  tdCount.textContent = count++;
                  tr.appendChild(tdCount);

                  let tdInput = document.createElement('td');
                  tdInput.textContent = input;
                  tr.appendChild(tdInput);

                  let tdDate = document.createElement('td');
                  let currentDate = new Date();
                  tdDate.textContent = currentDate.toLocaleDateString();
                  tr.appendChild(tdDate);

                  let tdCheckbox = document.createElement('td');
                  let checkbox = document.createElement('input');
                  checkbox.type = 'checkbox';
                  checkbox.style.marginLeft = "15px";
                  checkbox.style.cursor = 'pointer';

                  checkbox.addEventListener('change', compleatAndPending);
                  tdCheckbox.appendChild(checkbox);
                  tr.appendChild(tdCheckbox);

                  let tdEdit = document.createElement('td');
                  tdEdit.innerHTML = '<i class="fa-regular fa-pen-to-square edit-icon"></i>';
                  tdEdit.style.cursor = 'pointer';

                  tdEdit.addEventListener("click", () => {
                        userinput.value = tdInput.textContent;

                        if (taskbutton.textContent.trim().toLowerCase() === "add") {
                              taskbutton.textContent = "Update";
                              editingRow = tr;
                        } else {
                              taskbutton.textContent = "Add";
                        }
                  });

                  tr.appendChild(tdEdit);

                  let tdDelete = document.createElement('td');
                  tdDelete.innerHTML = '<span class="material-symbols-outlined delete-icon">delete</span>';
                  tdDelete.style.cursor = 'pointer';

                  tdDelete.addEventListener('click', () => {
                        tr.remove();
                        counter()
                        compleatAndPending();
                  });

                  tr.appendChild(tdDelete);

                  table.appendChild(tr);
            }

            compleatAndPending();
            userinput.value = '';
      }
});
