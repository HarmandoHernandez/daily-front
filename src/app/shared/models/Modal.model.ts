export class ModalData {
  constructor (
    public title: string,
    public body: string,
    public actions: ModalActions[]
  ) { }
}

export class ModalActions {
  constructor (
    public readonly id: string,
    public readonly title: string,
    public readonly color: string
  ) { }
}
