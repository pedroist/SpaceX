export interface ILaunch {
    id: string,
    img?: string,
    name?: string,
    date?: Date,
    details?: string,
    success?: boolean,
    classification?: string, //field obtain by the success and upcoming parameters
    upcoming?: boolean,
    rocketId?: string,
    rocketName?: string //field obtain through the rocket API with the id
}