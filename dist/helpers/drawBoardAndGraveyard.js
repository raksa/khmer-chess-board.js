"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = drawBoardAndGraveyard;

var _khmerChess = require("khmer-chess");

var _CellManager = _interopRequireDefault(require("../CellManager"));

var _constance = require("../providers/constance");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function drawBoardAndGraveyard(_ref) {
  var uniqueClassName = _ref.uniqueClassName,
      options = _ref.options,
      container = _ref.container,
      boardManager = _ref.boardManager,
      graveyardManager = _ref.graveyardManager;
  var width = options.width,
      cellWidth = options.cellWidth,
      graveyardContainerHeight = options.graveyardContainerHeight,
      graveyardWidth = options.graveyardWidth,
      graveyardContainerPadding = options.graveyardContainerPadding;

  var createTable = function createTable() {
    var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : container;
    var table = document.createElement('table');
    parent.appendChild(table);
    return table;
  };

  var createTbody = function createTbody(parent) {
    var tbody = document.createElement('tbody');
    parent.appendChild(tbody);
    return tbody;
  };

  var createTr = function createTr(parent) {
    var tr = document.createElement('tr');
    parent.appendChild(tr);
    return tr;
  };

  var createTd = function createTd(parent) {
    var td = document.createElement('td');
    parent.appendChild(td);
    return td;
  };

  var table = createTable();
  table.classList.add(_constance.TABLE_CLASS);
  table.classList.add(uniqueClassName);
  var tbody = createTbody(table);

  for (var i = 0; i < _khmerChess.ROW_NUMBER; i++) {
    var _tr = createTr(tbody);

    _tr.classList.add(_constance.TR_PIECE_CLASS_NAME);

    for (var j = 0; j < _khmerChess.ROW_NUMBER; j++) {
      var td = createTd(_tr);
      var cell = new _CellManager["default"](new _khmerChess.Point(j, _khmerChess.ROW_NUMBER - i - 1), td, null);

      var index = _khmerChess.Point.xyToIndex(j, _khmerChess.ROW_NUMBER - i - 1);

      boardManager.push(index, cell);
    }
  }

  var tr = createTr(tbody);
  tr.classList.add(_constance.TR_PIECE_SHADOW_CLASS_NAME);
  var tdShadow = createTd(tr);
  var trPlayerContainer = createTr(tbody);
  trPlayerContainer.classList.add('tr-player');
  trPlayerContainer.style.height = "".concat(graveyardContainerHeight / 3);
  var tdPlayerContainer = createTd(trPlayerContainer);
  tdPlayerContainer.classList.add('player');
  tdPlayerContainer.addEventListener('mousewheel', function (e) {
    this.scrollLeft -= e.wheelDelta;
    e.preventDefault();
  }, false);
  tdPlayerContainer.colSpan = 8;
  var trGraveyardContainer = createTr(tbody);
  trGraveyardContainer.classList.add('tr-graveyard');
  trGraveyardContainer.style.height = "".concat(graveyardContainerHeight);
  var tdGraveyardContainer = createTd(trGraveyardContainer);
  tdGraveyardContainer.classList.add('graveyard');
  tdGraveyardContainer.addEventListener('mousewheel', function (e) {
    this.scrollLeft -= e.wheelDelta;
    e.preventDefault();
  }, false);
  tdGraveyardContainer.colSpan = 8;
  var div = document.createElement('div');
  div.style.overflowX = 'scroll';
  div.style.overflowY = 'hidden';
  tdGraveyardContainer.appendChild(div);
  var tableGraveyard = createTable(div);
  tableGraveyard.classList.add(_constance.GRAVEYARD_CLASS_NAME);
  tableGraveyard.style.width = "".concat(graveyardWidth);
  tableGraveyard.style.height = "".concat(cellWidth);
  tableGraveyard.style.boxShadow = "inset 0 0 ".concat(width / 60, "px #000000");
  var tbodyGraveyard = createTbody(tableGraveyard);
  var trGraveyard = createTr(tbodyGraveyard);
  trGraveyard.classList.add(_constance.TR_PIECE_CLASS_NAME);
  trGraveyard.style.width = "".concat(graveyardWidth);

  for (var _i = 0; _i < _constance.TD_GRAVEYARD_NUMBER; _i++) {
    var tdGraveyard = createTd(trGraveyard);

    var _cell = new _CellManager["default"](new _khmerChess.Point(_i, 0), tdGraveyard, null, true);

    graveyardManager.push(_cell);
  }

  return {
    domBoard: table,
    domGraveyard: tableGraveyard,
    playerContainer: tdPlayerContainer,
    tdShadow: tdShadow
  };
}
/*
 * Copyright (c) 2021, K4us
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2RyYXdCb2FyZEFuZEdyYXZleWFyZC50cyJdLCJuYW1lcyI6WyJkcmF3Qm9hcmRBbmRHcmF2ZXlhcmQiLCJ1bmlxdWVDbGFzc05hbWUiLCJvcHRpb25zIiwiY29udGFpbmVyIiwiYm9hcmRNYW5hZ2VyIiwiZ3JhdmV5YXJkTWFuYWdlciIsIndpZHRoIiwiY2VsbFdpZHRoIiwiZ3JhdmV5YXJkQ29udGFpbmVySGVpZ2h0IiwiZ3JhdmV5YXJkV2lkdGgiLCJncmF2ZXlhcmRDb250YWluZXJQYWRkaW5nIiwiY3JlYXRlVGFibGUiLCJwYXJlbnQiLCJ0YWJsZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGJvZHkiLCJ0Ym9keSIsImNyZWF0ZVRyIiwidHIiLCJjcmVhdGVUZCIsInRkIiwiY2xhc3NMaXN0IiwiYWRkIiwiVEFCTEVfQ0xBU1MiLCJpIiwiUk9XX05VTUJFUiIsIlRSX1BJRUNFX0NMQVNTX05BTUUiLCJqIiwiY2VsbCIsIkNlbGxNYW5hZ2VyIiwiUG9pbnQiLCJpbmRleCIsInh5VG9JbmRleCIsInB1c2giLCJUUl9QSUVDRV9TSEFET1dfQ0xBU1NfTkFNRSIsInRkU2hhZG93IiwidHJQbGF5ZXJDb250YWluZXIiLCJzdHlsZSIsImhlaWdodCIsInRkUGxheWVyQ29udGFpbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzY3JvbGxMZWZ0Iiwid2hlZWxEZWx0YSIsInByZXZlbnREZWZhdWx0IiwiY29sU3BhbiIsInRyR3JhdmV5YXJkQ29udGFpbmVyIiwidGRHcmF2ZXlhcmRDb250YWluZXIiLCJkaXYiLCJvdmVyZmxvd1giLCJvdmVyZmxvd1kiLCJ0YWJsZUdyYXZleWFyZCIsIkdSQVZFWUFSRF9DTEFTU19OQU1FIiwiYm94U2hhZG93IiwidGJvZHlHcmF2ZXlhcmQiLCJ0ckdyYXZleWFyZCIsIlREX0dSQVZFWUFSRF9OVU1CRVIiLCJ0ZEdyYXZleWFyZCIsImRvbUJv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Q3FDLGNBQUQsQ0FBNUI7QUFDQUMsRUFBQUEsV0FBVyxDQUFDbEMsU0FBWixDQUFzQkMsR0FBdEIsQ0FBMEJJLDhCQUExQjtBQUNBNkIsRUFBQUEsV0FBVyxDQUFDbEIsS0FBWixDQUFrQmpDLEtBQWxCLGFBQTZCRyxjQUE3Qjs7QUFFQSxPQUFLLElBQUlpQixFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHZ0MsOEJBQXBCLEVBQXlDaEMsRUFBQyxFQUExQyxFQUE4QztBQUMxQyxRQUFNaUMsV0FBVyxHQUFHdEMsUUFBUSxDQUFDb0MsV0FBRCxDQUE1Qjs7QUFDQSxRQUFNM0IsS0FBSSxHQUFHLElBQUlDLHVCQUFKLENBQWdCLElBQUlDLGlCQUFKLENBQVVOLEVBQVYsRUFBYSxDQUFiLENBQWhCLEVBQWlDaUMsV0FBakMsRUFBOEMsSUFBOUMsRUFBb0QsSUFBcEQsQ0FBYjs7QUFDQXRELElBQUFBLGdCQUFnQixDQUFDOEIsSUFBakIsQ0FBc0JMLEtBQXRCO0FBQ0g7O0FBRUQsU0FBTztBQUNIOEIsSUFBQUEsUUFBUSxFQUFFL0MsS0FEUDtBQUVIZ0QsSUFBQUEsWUFBWSxFQUFFUixjQUZYO0FBR0hTLElBQUFBLGVBQWUsRUFBRXJCLGlCQUhkO0FBSUhKLElBQUFBLFFBQVEsRUFBUkE7QUFKRyxHQUFQO0FBTUg7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9hcmRNYW5hZ2VyIGZyb20gJy4uL0JvYXJkTWFuYWdlcic7XG5pbXBvcnQgR3JhdmV5YXJkTWFuYWdlciBmcm9tICcuLi9HcmF2ZXlhcmRNYW5hZ2VyJztcbmltcG9ydCBPcHRpb25zTWFuYWdlciBmcm9tICcuLi9PcHRpb25zTWFuYWdlcic7XG5cbmltcG9ydCB7XG4gICAgUG9pbnQsXG4gICAgUk9XX05VTUJFUixcbn0gZnJvbSAna2htZXItY2hlc3MnO1xuaW1wb3J0IENlbGxNYW5hZ2VyIGZyb20gJy4uL0NlbGxNYW5hZ2VyJztcbmltcG9ydCB7XG4gICAgVERfR1JBVkVZQVJEX05VTUJFUixcbiAgICBUQUJMRV9DTEFTUyxcbiAgICBHUkFWRVlBUkRfQ0xBU1NfTkFNRSxcbiAgICBUUl9QSUVDRV9DTEFTU19OQU1FLFxuICAgIFRSX1BJRUNFX1NIQURPV19DTEFTU19OQU1FLFxufSBmcm9tICcuLi9wcm92aWRlcnMvY29uc3RhbmNlJztcblxudHlwZSBUeXBlID0ge1xuICAgIHVuaXF1ZUNsYXNzTmFtZTogc3RyaW5nO1xuICAgIG9wdGlvbnM6IE9wdGlvbnNNYW5hZ2VyO1xuICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgYm9hcmRNYW5hZ2VyOiBCb2FyZE1hbmFnZXI7XG4gICAgZ3JhdmV5YXJkTWFuYWdlcjogR3JhdmV5YXJkTWFuYWdlcjtcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcmF3Qm9hcmRBbmRHcmF2ZXlhcmQoe1xuICAgIHVuaXF1ZUNsYXNzTmFtZSwgb3B0aW9ucywgY29udGFpbmVyLCBib2FyZE1hbmFnZXIsIGdyYXZleWFyZE1hbmFnZXIgfTogVHlwZSkge1xuICAgIGNvbnN0IHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGNlbGxXaWR0aCxcbiAgICAgICAgZ3JhdmV5YXJkQ29udGFpbmVySGVpZ2h0LFxuICAgICAgICBncmF2ZXlhcmRXaWR0aCxcbiAgICAgICAgZ3JhdmV5YXJkQ29udGFpbmVyUGFkZGluZyxcbiAgICB9ID0gb3B0aW9ucztcblxuICAgIGNvbnN0IGNyZWF0ZVRhYmxlID0gKHBhcmVudCA9IGNvbnRhaW5lcikgPT4ge1xuICAgICAgICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgICAgIHJldHVybiB0YWJsZTtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZVRib2R5ID0gKHBhcmVudDogSFRNTFRhYmxlRWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCB0Ym9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0Ym9keSk7XG4gICAgICAgIHJldHVybiB0Ym9keTtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZVRyID0gKHBhcmVudDogSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICByZXR1cm4gdHI7XG4gICAgfTtcbiAgICBjb25zdCBjcmVhdGVUZCA9IChwYXJlbnQ6IEhUTUxUYWJsZVJvd0VsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodGQpO1xuICAgICAgICByZXR1cm4gdGQ7XG4gICAgfTtcblxuICAgIGNvbnN0IHRhYmxlID0gY3JlYXRlVGFibGUoKTtcbiAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKFRBQkxFX0NMQVNTKTtcbiAgICB0YWJsZS5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNsYXNzTmFtZSk7XG4gICAgY29uc3QgdGJvZHkgPSBjcmVhdGVUYm9keSh0YWJsZSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPV19OVU1CRVI7IGkrKykge1xuICAgICAgICBjb25zdCB0ciA9IGNyZWF0ZVRyKHRib2R5KTtcbiAgICAgICAgdHIuY2xhc3NMaXN0LmFkZChUUl9QSUVDRV9DTEFTU19OQU1FKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBST1dfTlVNQkVSOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHRkID0gY3JlYXRlVGQodHIpO1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IG5ldyBDZWxsTWFuYWdlcihuZXcgUG9pbnQoaiwgUk9XX05VTUJFUiAtIGkgLSAxKSwgdGQsIG51bGwpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBQb2ludC54eVRvSW5kZXgoaiwgUk9XX05VTUJFUiAtIGkgLSAxKTtcbiAgICAgICAgICAgIGJvYXJkTWFuYWdlci5wdXNoKGluZGV4LCBjZWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB0ciA9IGNyZWF0ZVRyKHRib2R5KTtcbiAgICB0ci5jbGFzc0xpc3QuYWRkKFRSX1BJRUNFX1NIQURPV19DTEFTU19OQU1FKTtcbiAgICBjb25zdCB0ZFNoYWRvdyA9IGNyZWF0ZVRkKHRyKTtcblxuICAgIGNvbnN0IHRyUGxheWVyQ29udGFpbmVyID0gY3JlYXRlVHIodGJvZHkpO1xuICAgIHRyUGxheWVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RyLXBsYXllcicpO1xuICAgIHRyUGxheWVyQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke2dyYXZleWFyZENvbnRhaW5lckhlaWdodCAvIDN9YDtcblxuICAgIGNvbnN0IHRkUGxheWVyQ29udGFpbmVyID0gY3JlYXRlVGQodHJQbGF5ZXJDb250YWluZXIpO1xuICAgIHRkUGxheWVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3BsYXllcicpO1xuICAgIHRkUGxheWVyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBmdW5jdGlvbiAoZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsTGVmdCAtPSAoZS53aGVlbERlbHRhKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sIGZhbHNlKTtcbiAgICB0ZFBsYXllckNvbnRhaW5lci5jb2xTcGFuID0gODtcblxuICAgIGNvbnN0IHRyR3JhdmV5YXJkQ29udGFpbmVyID0gY3JlYXRlVHIodGJvZHkpO1xuICAgIHRyR3JhdmV5YXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RyLWdyYXZleWFyZCcpO1xuICAgIHRyR3JhdmV5YXJkQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke2dyYXZleWFyZENvbnRhaW5lckhlaWdodH1gO1xuXG4gICAgY29uc3QgdGRHcmF2ZXlhcmRDb250YWluZXIgPSBjcmVhdGVUZCh0ckdyYXZleWFyZENvbnRhaW5lcik7XG4gICAgdGRHcmF2ZXlhcmRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZ3JhdmV5YXJkJyk7XG4gICAgdGRHcmF2ZXlhcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxMZWZ0IC09IChlLndoZWVsRGVsdGEpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIHRkR3JhdmV5YXJkQ29udGFpbmVyLmNvbFNwYW4gPSA4O1xuXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LnN0eWxlLm92ZXJmbG93WCA9ICdzY3JvbGwnO1xuICAgIGRpdi5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJztcblxuICAgIHRkR3JhdmV5YXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgY29uc3QgdGFibGVHcmF2ZXlhcmQgPSBjcmVhdGVUYWJsZShkaXYpO1xuICAgIHRhYmxlR3JhdmV5YXJkLmNsYXNzTGlzdC5hZGQoR1JBVkVZQVJEX0NMQVNTX05BTUUpO1xuICAgIHRhYmxlR3JhdmV5YXJkLnN0eWxlLndpZHRoID0gYCR7Z3JhdmV5YXJkV2lkdGh9YDtcbiAgICB0YWJsZUdyYXZleWFyZC5zdHlsZS5oZWlnaHQgPSBgJHtjZWxsV2lkdGh9YDtcbiAgICB0YWJsZUdyYXZleWFyZC5zdHlsZS5ib3hTaGFkb3cgPSBgaW5zZXQgMCAwICR7d2lkdGggLyA2MH1weCAjMDAwMDAwYDtcblxuICAgIGNvbnN0IHRib2R5R3JhdmV5YXJkID0gY3JlYXRlVGJvZHkodGFibGVHcmF2ZXlhcmQpO1xuICAgIGNvbnN0IHRyR3JhdmV5YXJkID0gY3JlYXRlVHIodGJvZHlHcmF2ZXlhcmQpO1xuICAgIHRyR3JhdmV5YXJkLmNsYXNzTGlzdC5hZGQoVFJfUElFQ0VfQ0xBU1NfTkFNRSk7XG4gICAgdHJHcmF2ZXlhcmQuc3R5bGUud2lkdGggPSBgJHtncmF2ZXlhcmRXaWR0aH1gO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBURF9HUkFWRVlBUkRfTlVNQkVSOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGRHcmF2ZXlhcmQgPSBjcmVhdGVUZCh0ckdyYXZleWFyZCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBuZXcgQ2VsbE1hbmFnZXIobmV3IFBvaW50KGksIDApLCB0ZEdyYXZleWFyZCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgIGdyYXZleWFyZE1hbmFnZXIucHVzaChjZWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkb21Cb2FyZDogdGFibGUsXG4gICAgICAgIGRvbUdyYXZleWFyZDogdGFibGVHcmF2ZXlhcmQsXG4gICAgICAgIHBsYXllckNvbnRhaW5lcjogdGRQbGF5ZXJDb250YWluZXIsXG4gICAgICAgIHRkU2hhZG93LFxuICAgIH07XG59XG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEsIEs0dXNcbiAqIEF1dGhvcjogUmFrc2EgRW5nIDxlbmcucmFrc2FAZ21haWwuY29tPlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqIDEuIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAqICAgIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAyLiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gKiAgICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTICdBUyBJUydcbiAqIEFORCBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEVcbiAqIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFXG4gKiBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqIExJQUJMRSBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1JcbiAqIENPTlNFUVVFTlRJQUwgREFNQUdFUyAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GXG4gKiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOXG4gKiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVCAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKVxuICogQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuICpcbiAqKi8iXX0=