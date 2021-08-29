import { Point, Piece, KhmerChess } from 'khmer-chess';
import KhmerChessBoard from './KhmerChessBoard';
import OptionsManager from './OptionsManager';
export default class CellManager {
    point: Point;
    isGraveyard: boolean;
    containerDom: HTMLDivElement;
    piece: Piece;
    isUpsideDown: boolean;
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    constructor(point: Point, container: HTMLDivElement, piece: Piece, isGraveyard?: boolean);
    setProps(khmerChessBoard?: KhmerChessBoard): void;
    removePieceClasses(): void;
    removePiece(): void;
    setPiece(piece: Piece): void;
    addClassName(className: string): void;
    removeClassName(className: string): void;
    hasClassName(className: string): boolean;
    select(selected: boolean): void;
    get canMovePoints(): Point[];
    get isSelected(): boolean;
    get isCanMove(): boolean;
    get isMoved(): boolean;
    get isCanSelect(): boolean;
    attack(attacked: boolean): Piece;
    turn(attacked: boolean): void;
    get isAttacked(): boolean;
    get isTurn(): boolean;
    get onClick(): (this: GlobalEventHandlers, ev: MouseEvent) => any;
    setOnClick(listener: (this: GlobalEventHandlers, ev: MouseEvent) => any): void;
    removeOnClick(): void;
    setFlipped(isUpsideDown: boolean): void;
    clone(): CellManager;
    scrollIntoView(): void;
    movePieceTo(toCell: CellManager): void;
    movePieceToGraveyard(toCell: CellManager): void;
    moved(): void;
    clearMoved(): void;
    setCanMove(): void;
    clearCanMoved(): void;
}
