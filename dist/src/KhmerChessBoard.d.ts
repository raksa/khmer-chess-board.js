import GraveyardManager from './GraveyardManager';
import SoundManager from './SoundManager';
import BoardManager from './BoardManager';
import OptionsManager from './OptionsManager';
import { KhmerChess } from 'khmer-chess';
import type { KPGNOption } from 'khmer-chess';
import MessageManager from './MessageManager';
import PlayManager from './PlayManager';
import PieceShadowManager from './PieceShadowManager';
export default class KhmerChessBoard {
    static LOCALE_ENGLISH: string;
    static LOCALE_KHMER: string;
    static info: {
        name: string;
        version: string;
        description: string;
        main: string;
        types: string;
        scripts: {
            start: string;
            "build:bundle": string;
            "build:cp:pubic": string;
            "build:js": string;
            build: string;
            lint: string;
            "kc:ts:gen": string;
            test: string;
            cov: string;
        };
        repository: {
            type: string;
            url: string;
        };
        author: string;
        license: string;
        bugs: {
            url: string;
        };
        homepage: string;
        keywords: string[];
        dependencies: {
            "k4us-share": string;
            "khmer-chess": string;
        };
        devDependencies: {
            "@types/chai": string;
            "@types/chai-spies": string;
            "@types/mocha": string;
            "@typescript-eslint/eslint-plugin": string;
            "@typescript-eslint/parser": string;
            chai: string;
            "chai-spies": string;
            "cp-cli": string;
            "del-cli": string;
            eslint: string;
            "file-loader": string;
            "http-server": string;
            karma: string;
            "karma-chai": string;
            "karma-chrome-launcher": string;
            "karma-mocha": string;
            "karma-typescript": string;
            mocha: string;
            "source-map-loader": string;
            "ts-loader": string;
            typescript: string;
            webpack: string;
            "webpack-cli": string;
            "webpack-dev-server": string;
        };
    };
    static title: string;
    static version: string;
    containerDom: HTMLElement;
    domRootBoard: HTMLElement;
    options: OptionsManager;
    playManager: PlayManager;
    graveyardManager: GraveyardManager;
    boardManager: BoardManager;
    khmerChess: KhmerChess;
    soundManager: SoundManager;
    messageManager: MessageManager;
    pieceShadowManager: PieceShadowManager;
    constructor();
    setOptions(options: {
        container?: HTMLElement | null;
        width: number;
    }): void;
    move(fromIndex: number, toIndex: number): void;
    setFullScreen(isFullScreen: boolean): void;
    render(): void;
    setLocale(locale: string): void;
    setCellNote(): void;
    addAllDomCss(): void;
    loadKpng(kpng: KPGNOption | string): void;
    reset(): void;
    loadRen(renStr?: string): void;
    applyPieces(): void;
    removeAllDomElements(): void;
    removeAllDomCss(): void;
    destroy(): void;
}
