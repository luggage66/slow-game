declare module "*.png" {
    const path: string;
    export default path;
}

declare module "*.scss" {
    type CssModule = {
        [name: string]: string;
    }
    const _: CssModule;
    export default _;
}
