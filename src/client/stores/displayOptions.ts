import { observable } from 'mobx';

export class DisplayOptions {
    // Development Options
    @observable highlightChunks: boolean = true;
    @observable highlightEntities: boolean = true;
}
