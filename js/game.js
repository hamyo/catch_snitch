class Harry {
    constructor(x, y) {
        this._previousX = null;
        this._previousY = null;
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    get previousX() {
        return this._previousX;
    }

    get previousY() {
        return this._previousY;
    }
    move(x, y) {
        this._previousX = this._x;
        this._x = x;
        this._previousY = this._y;
        this._y = y;
    }
}

class Snitch {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    move(x, y) {
        this._x = x;
        this._y = y;
    }
}

class Game {
    constructor(gameField) {
        this.harry = new Harry(2, 1);
        this.snitch = new Snitch(0, 1);
        this.gameField = $(gameField);
        this.harryClassName = 'harry-current';
        this.previousHarryClassName = 'harry-previous';
        this.snitchClassName = 'snitch';
        this.successClassName = 'success';
        this._showPrevious = false;
        this.gameClasses = [this.harryClassName, this.previousHarryClassName, this.snitchClassName, this.successClassName]
    }
    set showPrevious(showPrevious) {
        this._showPrevious = !!showPrevious;
    }
    findCell(x, y) {
        return this.gameField.find("td").filter(function (){
            return $(this).prop("x") === x && $(this).prop("y") === y;
        }).first();
    }
    clearOldGameView() {
        $(this.gameField).find("td").removeClass(this.gameClasses);
    }
    drawPreviousHarry() {
        if (this.harry.previousX != null && this.harry.previousY != null) {
            let $cell = this.findCell(this.harry.previousX, this.harry.previousY);
            $cell.addClass(this.previousHarryClassName);
        }
    }
    drawHarry() {
        let $cell = this.findCell(this.harry.x, this.harry.y);
        $cell.addClass(this.harryClassName);
    }
    drawSnitch() {
        let $cell = this.findCell(this.snitch.x, this.snitch.y);
        $cell.addClass(this.snitchClassName);
    }
    drawSuccess() {
        let $cell = this.findCell(this.harry.x, this.harry.y);
        $cell.addClass(this.successClassName);
    }
    draw() {
        this.clearOldGameView();

        if (this._showPrevious) {
            this.drawPreviousHarry();
        }

        if (this.checkFinish()) {
            this.drawSuccess();
        } else {
            this.drawHarry();
            this.drawSnitch();
        }
    }
    checkFinish() {
        return this.harry.x === this.snitch.x && this.harry.y === this.snitch.y;
    }
    nextStep(selectedCell) {
        this.harry.move($(selectedCell).prop("x"), $(selectedCell).prop("y"));
        let snitchY = (this.harry.previousY === 0) ? this.gameField.prop("maxY") : this.harry.previousY - 1;
        this.snitch.move(this.harry.previousX, snitchY);
        this.draw();
    }

}

