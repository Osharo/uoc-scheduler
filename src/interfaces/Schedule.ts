export interface Event {
    from: string,
    to: string,
    task: string,
    required?: boolean
}

export interface Subject {
    name: string,
    class?: string,
    items?: Array<Event>
}