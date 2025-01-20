import ToDoList from '../model/ToDoList'

interface DOMList {
  ul: HTMLUListElement,
  clear(): void,
  render(toDoList: ToDoList): void,
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = '';
  }

  render(toDoList: ToDoList): void {
    this.clear();

    toDoList.list.forEach(item => {
      const liElement = document.createElement('li') as HTMLLIElement;

      const checkboxElement = document.createElement('input') as HTMLInputElement;
      checkboxElement.type = 'checkbox';
      checkboxElement.id = item.id;
      checkboxElement.tabIndex = 0;
      checkboxElement.checked = item.checked;
      liElement.appendChild(checkboxElement);

      checkboxElement.addEventListener('change', () => {
        item.checked = !item.checked;
        toDoList.save();
      });

      const labelElement = document.createElement('label') as HTMLLabelElement;
      labelElement.htmlFor = item.id;
      labelElement.textContent = item.description;
      liElement.appendChild(labelElement);

      const deleteButton = document.createElement('button') as HTMLButtonElement;
      deleteButton.textContent = 'X';
      liElement.appendChild(deleteButton);

      deleteButton.addEventListener('click', () => {
        toDoList.removeItem(item.id);
        this.render(toDoList);
      });

      this.ul.appendChild(liElement);
    });
  }
}
