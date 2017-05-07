import { observable } from 'mobx';

export class RenderOptions {
    // Development Options
    @observable highlightChunks: boolean = true;
}
