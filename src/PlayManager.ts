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
import KhmerChessBoard from './KhmerChessBoard';
import appendCss from './helpers/appendCss';
import PlayManagerEventController from './event/PlayManagerEventController';
import {
    Move,
} from 'khmer-chess';
import MoveData from './MoveData';

export default class PlayManager {
    khmerChessBoard: KhmerChessBoard;

    renDataList: MoveData[] = [];
    playEventController: PlayManagerEventController<MoveData>;
    playerContainer: HTMLElement;
    dataContainerDom: HTMLElement;
    backBtnDom: HTMLButtonElement;
    playBtnDom: HTMLButtonElement;
    pauseBtnDom: HTMLButtonElement;
    nextBtnDom: HTMLButtonElement;

    containerClassName = 'player-table';
    currentIndex = 0;
    constructor(khmerChessBoard: KhmerChessBoard) {
        this.khmerChessBoard = khmerChessBoard;
        this.playEventController = new PlayManagerEventController();
        appendCss(this.khmerChessBoard.options.uniqueClassName, this.css());
        this.playerContainer = document.createElement('div');
        this.dataContainerDom = document.createElement('div');
        this.backBtnDom = document.createElement('button');
        this.playBtnDom = document.createElement('button');
        this.pauseBtnDom = document.createElement('button');
        this.nextBtnDom = document.createElement('button');
    }
    destroy() {
        this.renDataList.forEach((moveData) => {
            moveData.destroy();
        });
        this.renDataList = [];
        (this.playerContainer as any) = null;
        (this.dataContainerDom as any) = null;
        (this.renDataList as any) = null;
        this.playEventController.destroy();
        (this.playEventController as any) = null;
        (this.backBtnDom as any) = null;
        (this.playBtnDom as any) = null;
        (this.pauseBtnDom as any) = null;
        (this.nextBtnDom as any) = null;

        (this.khmerChessBoard as any) = null;
    }
    hideController() {
        if (this.playerContainer.parentElement) {
            this.playerContainer.parentElement.style.display = 'none';
        }
    }
    showController() {
        if (this.playerContainer.parentElement) {
            this.playerContainer.parentElement.style.display = '';
        }
    }
    get isControllerHidden() {
        return !!(this.playerContainer.parentElement?.style.display.toLocaleLowerCase() === 'none');
    }
    get isCanBack() {
        return !!(this.khmerChessBoard.khmerChess.kpgn.moves.length && this.currentIndex);
    }
    get isCanNext() {
        const movesLength = this.khmerChessBoard.khmerChess.kpgn.moves.length;
        return this.khmerChessBoard.khmerChess.kpgn.moves.length && this.currentIndex < movesLength;
    }
    renderMoveData() {
        this.renDataList.forEach((moveData) => {
            moveData.destroy();
        });
        const isEnglish = this.khmerChessBoard.options.isEnglish;
        const current = this.currentIndex - 1;
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.renDataList = moves.map((move, i) => {
            const moveData = new MoveData({
                index: i + 1,
                containerDom: this.dataContainerDom,
                renData: '',
                title: move.getMessage(isEnglish),
                str: move.toString(),
                onClick: () => {
                    this.toIndex(moveData.index);
                    this.playEventController.click(moveData);
                },
            });
            if (current === i) {
                moveData.current(true);
            }
            return moveData;
        });
        if (this.renDataList.length) {
            this.dataContainerDom.scrollTop = this.dataContainerDom.scrollHeight;
        }
    }
    draw(playerContainer: HTMLElement) {
        this.playerContainer = playerContainer;
        const containerWidth = ~~(this.khmerChessBoard.options.width * 3 / 4);
        const table = document.createElement('table');
        table.classList.add(this.khmerChessBoard.options.uniqueClassName);
        table.classList.add(this.containerClassName);
        playerContainer.appendChild(table);
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        let tdHistory = document.createElement('td');
        const div = document.createElement('div');
        div.style.width = `${containerWidth}px`;
        div.style.height = '50px';
        div.classList.add('container');
        this.dataContainerDom = div;
        tdHistory.appendChild(div);
        tdHistory.style.width = `${containerWidth}px`;
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        let btn = document.createElement('button');
        btn.innerHTML = '<';
        this.backBtnDom = btn;
        tdHistory.appendChild(btn);
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        btn = document.createElement('button');
        btn.innerHTML = '^';
        this.playBtnDom = btn;
        tdHistory.appendChild(btn);
        btn = document.createElement('button');
        btn.innerHTML = '#';
        this.pauseBtnDom = btn;
        tdHistory.appendChild(btn);
        btn.style.display = 'none';
        tr.appendChild(tdHistory);
        tdHistory = document.createElement('td');
        btn = document.createElement('button');
        btn.innerHTML = '>';
        this.nextBtnDom = btn;
        tdHistory.appendChild(btn);
        tr.appendChild(tdHistory);
        this.btnListen();
    }
    btnListen() {
        this.backBtnDom.onclick = () => {
            this.back();
        };
        this.playBtnDom.onclick = () => {
            this.play();
        };
        this.pauseBtnDom.onclick = () => {
            this.pause();
        };
        this.nextBtnDom.onclick = () => {
            this.next();
        };
    }
    css(): string {
        const containerSelector = `table.${this.khmerChessBoard.options.uniqueClassName}.${this.containerClassName}`;
        return `
        ${containerSelector} {
            width: 100%;
            height: 100%;
            box-shadow: rgb(0, 0, 0) 0px 0px 2px inset;
        }
        ${containerSelector} td {
            padding: 0px;
            margin: 0px;
            text-align: center;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 1px inset;
        }
        ${containerSelector} .container {
            font-size: 14px;
            text-align: right;
            overflow-x: auto;
        }
        ${containerSelector} .container::-webkit-scrollbar {
            width: 1em;
        }
        ${containerSelector} .container .data {
            display: inline-block;
            margin: 2px;
            padding: 0 2px;
            border: 1px solid green;
            border-radius: 2px;
            cursor: pointer;
        }
        ${containerSelector} .container > div.current {
            background-color: rgba(255, 255, 255, 0.3);
            cursor: not-allowed;
        }
        ${containerSelector} .container span.index {
            color: grey;
            padding-right: 2px;
            border-right: 1px solid gray;
            margin-right: 2px;
            font-size: 12px;
        }
        `;
    }
    get isCanUndo() {
        return !!this.khmerChessBoard.khmerChess.kpgn.latestMove;
    }
    undo() {
        if (this.isCanUndo) {
            this.offTurning();
            this.toIndex(this.khmerChessBoard.khmerChess.kpgn.moves.length);
            this.back(() => {
                this.khmerChessBoard.khmerChess.kpgn.moves.pop();
                this.turning();
            });
        }
    }
    get isCanPlay() {
        return !this.isCanNext;
    }
    get isPlaying() {
        return this.khmerChessBoard.boardManager.isTurning;
    }
    offTurning() {
        this.khmerChessBoard.boardManager.clearTurnCells();
        this.render();
    }
    turning() {
        this.khmerChessBoard.boardManager.takeTurn();
        this.render();
    }
    play() {
        if (!this.isCanPlay) {
            return false;
        }
        this.playEventController.play();
        this.turning();
        return true;
    }
    pause() {
        this.playEventController.pause();
        this.offTurning();
        return true;
    }
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    render() {
        this.playBtnDom.style.display = 'none';
        this.pauseBtnDom.style.display = 'none';
        this.backBtnDom.disabled = true;
        this.nextBtnDom.disabled = true;
        if (this.isPlaying) {
            this.pauseBtnDom.style.display = '';
        } else {
            this.playBtnDom.style.display = '';
        }
        this.backBtnDom.disabled = !this.isCanBack;
        this.nextBtnDom.disabled = !this.isCanNext;
        this.playBtnDom.disabled = !this.isCanPlay;
        this.renderMoveData();
    }
    loadCurrentRen() {
        this.khmerChessBoard.loadRen(this.currentMove?.renStr as string);
        this.khmerChessBoard.boardManager.checkBoardEvent();
    }
    get currentMove() {
        return this.khmerChessBoard.khmerChess.kpgn.getMove(this.currentIndex - 1);
    }
    back(callback: (arg0: void | Error) => void = () => { }) {
        if (!this.isCanBack) {
            return false;
        }
        this.offTurning();
        this.playEventController.back();
        this.currentIndex--;
        const kpgn = this.khmerChessBoard.khmerChess.kpgn;
        const move = kpgn.getMove(this.currentIndex);
        if (move === null) {
            return false;
        }
        this.applyMoveBack(move, (error) => {
            callback(error);
        });
        return true;
    }
    next(callback: (arg0: void | Error) => void = () => { }) {
        const kpgn = this.khmerChessBoard.khmerChess.kpgn;
        this.playEventController.next();
        const move = kpgn.getMove(this.currentIndex);
        if (move === null) {
            return false;
        }
        this.currentIndex++;
        this.applyMove(move, (error) => {
            callback(error);
        });
        return true;
    }
    applyMove(move: Move, callback: (arg0: void | Error) => void = () => { }) {
        const {
            boardManager,
            graveyardManager,
            pieceShadowManager,
            soundManager,
        } = this.khmerChessBoard;
        pieceShadowManager.finishAnimations();

        const finish = () => {
            const fromCell = boardManager.get(move.moveFrom.index);
            const toCell = boardManager.get(move.moveTo.index);
            pieceShadowManager.movingPiece(fromCell, toCell, () => {
                fromCell.movePieceTo(toCell);
                if (move.isUpgrading) {
                    toCell.upgrade();
                }
                this.loadCurrentRen();
                this.highlightCurrentMove();
                soundManager.playMove();
                this.render();
                callback();
            });
        };

        if (move.captured) {
            const fromBCell = boardManager.get(move.captured.fromBoardPoint.index);
            const toGYCell = graveyardManager.get(move.captured.toGraveyardPoint.index);
            pieceShadowManager.movingPiece(fromBCell, toGYCell, () => {
                fromBCell.movePieceToGraveyard(toGYCell);
                graveyardManager.scrollLastToView();
                finish();
            });
            soundManager.playCapture();
        } else {
            finish();
        }
    }
    applyMoveBack(move: Move, callback: (arg0: void | Error) => void = () => { }) {
        const {
            boardManager,
            graveyardManager,
            pieceShadowManager,
            soundManager,
        } = this.khmerChessBoard;
        pieceShadowManager.finishAnimations();
        pieceShadowManager;

        const fromCell = boardManager.get(move.moveTo.index);
        const toCell = boardManager.get(move.moveFrom.index);

        const finish = () => {
            this.loadCurrentRen();
            this.highlightCurrentMove();
            soundManager.playMove();
            this.render();
            callback();
        };

        pieceShadowManager.movingPiece(fromCell, toCell, () => {
            fromCell.movePieceTo(toCell);
            if (move.isUpgrading) {
                toCell.downgrade();
            }
            if (move.captured) {
                const fromGYCell = graveyardManager.get(move.captured.toGraveyardPoint.index);
                const toBCell = boardManager.get(move.captured.fromBoardPoint.index);
                pieceShadowManager.movingPiece(fromGYCell, toBCell, () => {
                    fromGYCell.movePieceFromGraveyard(toBCell);
                    graveyardManager.scrollLastToView();
                    finish();
                });
                soundManager.playCapture();
            } else {
                finish();
            }
        });
    }
    highlightCurrentMove() {
        const boardManager = this.khmerChessBoard.boardManager;

        boardManager.clearSelectedCells();
        boardManager.clearMovedCells();
        boardManager.clearAttackCells();

        const currentMove = this.currentMove;
        if (currentMove) {
            const lastFromCell = boardManager.get(currentMove.moveFrom.index);
            const lastToCell = boardManager.get(currentMove.moveTo.index);
            if (lastFromCell !== null && lastToCell !== null) {
                boardManager.highlightMovedCells(lastFromCell, lastToCell);
            }
            if (currentMove.attacker) {
                const attacker = currentMove.attacker;
                const cell = boardManager.get(attacker.point.index);
                cell.attack(true);
                if (attacker.piece !== null) {
                    const king = boardManager.getKing(attacker.piece.colorOpponent);
                    if (king != null) {
                        king.attack(true);
                    }
                }
            }
        }
    }
    toIndex(index: number) {
        const pieceShadowManager = this.khmerChessBoard.pieceShadowManager;
        const isQuickMove = pieceShadowManager.isQuickMove;
        while (this.currentIndex !== index) {
            pieceShadowManager.quickMove(Math.abs(this.currentIndex - index) !== 1);
            if (this.currentIndex < index) {
                this.next();
            } else {
                this.back();
            }
        }
        pieceShadowManager.quickMove(isQuickMove);
        this.highlightCurrentMove();
    }
    resetCurrentIndex() {
        const moves = this.khmerChessBoard.khmerChess.kpgn.moves;
        this.currentIndex = moves.length;
    }
}
