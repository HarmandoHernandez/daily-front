export class Activity {
  // TODO: Hacer una para local y otro para cloud
  constructor (
    public id: string,
    public icon: string,
    public title: string,
    public startTime: string,
    public durationTime: number,
    public user?: string
  ) { }
}
