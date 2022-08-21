export class Ads {
    constructor(data) {
        this.id = data.id
        this.title = data.title || ''
        this.banner = data.banner || ''
    }
}