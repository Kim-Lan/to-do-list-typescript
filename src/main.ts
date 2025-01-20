import './css/style.css'
import ToDoList from './model/ToDoList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const toDoList = ToDoList.instance;
  const template = ListTemplate.instance;

  const newItemForm = document.getElementById('newItemForm') as HTMLFormElement;
  newItemForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();

    const newItemElement = document.getElementById('newItem') as HTMLInputElement;
    const newItemDescription: string = newItemElement.value.trim();
    if (!newItemDescription.length) return;

    const newItemId: number = toDoList.list.length ? parseInt(toDoList.list[toDoList.list.length - 1].id) + 1 : 0;

    const newItem: ListItem = new ListItem(newItemId.toString(), newItemDescription);
    toDoList.addItem(newItem);
    template.render(toDoList);

    newItemElement.value = '';
  });

  const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
  clearButton.addEventListener('click', (): void => {
    toDoList.clearList();
    template.clear();
  });

  toDoList.load();
  template.render(toDoList);
}

document.addEventListener('DOMContentLoaded', initApp);
