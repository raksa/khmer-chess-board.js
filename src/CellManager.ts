/*
 * Copyright (c) 2021-2022, K4us
 * Author: Raksa Eng <eng.raksa@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 **/
import {
    Point,
    Piece,
    CELL_COUNT,
} from 'khmer-chess';
import KhmerChessBoard from './KhmerChessBoard';
import {
    SELECTED_CLASS_NAME,
    PIECE_CLASS_NAME,
    ATTACKED_CLASS_NAME,
    FLIPPED_CLASS,
    MOVED_CLASS_NAME,
    CAN_MOVE_CLASS_NAME,
    TURN_CLASS_NAME,
} from './providers/constance';

export default class CellManager {
    khmerChessBoard: KhmerChessBoard;

    point: Point;
    piece: Piece | null = null;
    containerDom: HTMLDivElement = document.createElement('td');

    isGraveyard = false;
    isUpsideDown = false;
    constructor(khmerChessBoard: KhmerChessBoard, point: Point, container: HTMLDivElement,
        piece: Piece | null, isGraveyard = false) {
        this.khmerChessBoard = khmerChessBoard;

        this.point = point;
        this.setPiece(piece);
        this.containerDom = container;
        this.isGraveyard = isGraveyard;
    }
    destroy() {
        this.setPiece(null);

        (this.containerDom as any) = null;
        (this.point as any) = null;

        (this.khmerChessBoard as any) = null;
    }
    removePieceClasses() {
        this.removeClassName(PIECE_CLASS_NAME);
        Piece.colorChars.forEach((color) => {
            this.removeClassName(`color-${color}`);
        });
        Piece.pieceChars.forEach((type) => {
            this.removeClassName(`type-${type}`);
        });
    }
    removePiece() {
        this.removePieceClasses();
        this.piece = null;
    }

    setPiece(piece: Piece | null) {
        this.removePiece();
        this.piece = piece;
        if (this.piece) {
            this.addClassName(`type-${this.piece.type}`);
            this.addClassName(`color-${this.piece.color}`);
            this.addClassName(PIECE_CLASS_NAME);
        }
    }

    addClassName(className: string) {
        this.containerDom.classList.add(className);
    }

    removeClassName(className: string) {
        this.containerDom.classList.remove(className);
    }

    hasClassName(className: string) {
        return this.containerDom.classList.contains(className);
    }

    select(selected: boolean) {
        this.removeClassName(SELECTED_CLASS_NAME);
        if (selected && this.piece) {
            this.addClassName(SELECTED_CLASS_NAME);
        }
    }

    get canMovePoints() {
        const points = this.khmerChessBoard.khmerChess.getCanMovePointsByPoint(this.point);
        return points;
    }

    get isSelected() {
        return this.hasClassName(SELECTED_CLASS_NAME);
    }

    get isCanMove() {
        return this.hasClassName(CAN_MOVE_CLASS_NAME);
    }

    get isMoved() {
        return this.hasClassName(MOVED_CLASS_NAME);
    }

    get isCanSelect() {
        return this.hasClassName(TURN_CLASS_NAME);
    }

    attack(attacked: boolean) {
        this.removeClassName(ATTACKED_CLASS_NAME);
        if (attacked) {
            this.addClassName(ATTACKED_CLASS_NAME);
        }
    }

    turn(attacked: boolean) {
        this.removeClassName(TURN_CLASS_NAME);
        if (attacked) {
            this.addClassName(TURN_CLASS_NAME);
        }
    }

    get isAttacked() {
        return this.hasClassName(ATTACKED_CLASS_NAME);
    }

    get isTurning() {
        return this.hasClassName(TURN_CLASS_NAME);
    }
    get onClick() {
        return this.containerDom.onclick;
    }

    setOnClick(listener: (this: GlobalEventHandlers, ev: MouseEvent) => any) {
        this.containerDom.onclick = listener;
    }

    removeOnClick() {
        this.containerDom.onclick = null;
    }

    setFlipped(isUpsideDown: boolean) {
        this.removeClassName(FLIPPED_CLASS);
        if (this.isUpsideDown !== isUpsideDown) {
            const xy = Point.indexToXY(CELL_COUNT - 1 - this.point.index);
            this.point.x = xy.x;
            this.point.y = xy.y;
        }
        this.isUpsideDown = isUpsideDown;
        if (isUpsideDown) {
            this.addClassName(FLIPPED_CLASS);
        }
    }

    clone() {
        const div = document.createElement('div');
        return new CellManager(
            this.khmerChessBoard,
            new Point(this.point.x, this.point.y),
            div,
            this.piece);
    }

    movePieceTo(toCell: CellManager) {
        const piece = this.piece;
        this.removePiece();
        toCell.setPiece(piece);
    }

    movePieceToGraveyard(toGYCell: CellManager) {
        const deadPiece = this.piece;
        this.removePiece();
        toGYCell.setPiece(deadPiece);
    }
    movePieceFromGraveyard(toCell: CellManager) {
        const raisePiece = this.piece;
        this.removePiece();
        toCell.setPiece(raisePiece);
    }

    moved() {
        this.addClassName(MOVED_CLASS_NAME);
    }
    clearMoved() {
        this.removeClassName(MOVED_CLASS_NAME);
    }
    setCanMove() {
        this.addClassName(CAN_MOVE_CLASS_NAME);
    }
    clearCanMoved() {
        this.removeClassName(CAN_MOVE_CLASS_NAME);
    }
    upgrade() {
        if (this.piece && this.piece.upgrade()) {
            this.setPiece(this.piece);
        }
    }
    downgrade() {
        if (this.piece && this.piece.downgrade()) {
            this.setPiece(this.piece);
        }
    }
}
