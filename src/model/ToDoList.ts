import ListItem from './ListItem'

interface List {
  list: ListItem[],
  load(): void,
  save(): void,
  clearList(): void,
  addItem(item: ListItem): void,
  removeItem(id: string): void,
}

export default class ToDoList implements List {
  static instance: ToDoList = new ToDoList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("toDoList");
    if (typeof storedList !== "string") return;

    const parsedList: { _id: string, _description: string, _checked: boolean }[] = JSON.parse(storedList);

    parsedList.forEach(item => {
      const newListItem = new ListItem(item._id, item._description, item._checked);
      ToDoList.instance.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("toDoList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter(item => item.id !== id);
    this.save();
  }
}
