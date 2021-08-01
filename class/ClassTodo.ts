import moment from "moment";

export class ClassTodo {

    public title = ''
    public description = ''
    public date = moment().format('MMMM Do YYYY, h:mm:ss a')

    constructor(init?: Partial<ClassTodo>) {
        if (init === undefined) return
        Object.assign(this, init)
    }
}