import CellManager from './CellManager';
import OptionsManager from './OptionsManager';
import KhmerChessBoard from './KhmerChessBoard';
import { KhmerChess } from 'khmer-chess';
import BoardManagerEventController from './event/BoardManagerEventController';
export default class BoardManager {
    _cellManagers: CellManager[];
    options: OptionsManager;
    khmerChessBoard: KhmerChessBoard;
    khmerChess: KhmerChess;
    isUpsideDown: boolean;
    boardEventController: BoardManagerEventController<CellManager>;
    constructor();
    setProps(khmerChessBoard: KhmerChessBoard): void;
    enableClick(): void;
    put(i: number, cellPiece: CellManager): void;
    get(index: number): CellManager;
    getKing(color: string): CellManager;
    getByIndexCode(indexCode: string): CellManager;
    getByXY(x: number, y: number): CellManager;
    flip(): void;
    get pieceCells(): CellManager[];
    get pieceInTurnCells(): CellManager[];
    get selectedCells(): CellManager[];
    get canMoveCells(): CellManager[];
    get movedCells(): CellManager[];
    get attackedCells(): CellManager[];
    get turnCells(): CellManager[];
    clearSelectedCells(): void;
    clearCanMoveCells(): void;
    clearMovedCells(): void;
    clearAttackCells(): void;
    clearTurnCells(): void;
    removePiecesFromCells(): void;
    applyFlippingFlag(): void;
    setCellNote(): void;
    clearCellNote(): void;
    renderKhmerChessPieces(): void;
    changeTurn(turn: string): void;
}
