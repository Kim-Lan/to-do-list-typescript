export interface Item {
  id: string,
  description: string,
  checked: boolean,
}

export default class ListItem implements Item {
  constructor(
    private _id: string = '',
    private _description: string = '',
    private _checked: boolean = false,
  ) {}

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get checked(): boolean {
    return this._checked;
  }

  set checked(checked: boolean) {
    this._checked = checked;
  }
}
