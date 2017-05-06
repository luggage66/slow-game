import { observable } from 'mobx';

export class RenderOptions {
    @observable highlightChunks: boolean = true;
}
