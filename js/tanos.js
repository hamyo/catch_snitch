class Glove {
    constructor(url) {
        this.url = url;
        this.isShow = false;
    }
    isSame(otherGlove) {
        return this.url === otherGlove.url;
    }
    getUrl() {
        return "url('" + this.url + "')";
    }
}

class Game {
    constructor(gameField) {
        this.gameField = $(gameField);
        this.openCards = 0;
        this.oneTimeOpen = 0;
        this.previousChoise = null;
    }
    showGlove($td) {
        if (!$td.glove.isShow) {
            $td.glove.isShow = true;
            $td.css({'background-image': $td.glove.getUrl()});
            this.openCards++;
            this.oneTimeOpen++;
            let $previousChoise = this.previousChoise;
            if (this.oneTimeOpen === 2) {
                if (!$td.glove.isSame($previousChoise.glove)) {
                    this.openCards = this.openCards - 2;
                    setTimeout(function () {
                        $td.glove.isShow = false;
                        $td.css({'background-image': ''});
                        $previousChoise.glove.isShow = false;
                        $previousChoise.css({'background-image': ''});
                    }, 1000);
                }
                this.oneTimeOpen = 0;
                this.previousChoise = null;
            } else {
                this.previousChoise = $td;
            }
        }
    }
    calcGloveUrl(index) {
        if (index === 0 || index === 8) {
            return "image/tanos1.jpg";
        }
        if (index === 1 || index === 5) {
            return  "image/tanos2.jpg";
        }
        if (index === 2 || index === 7) {
            return "image/tanos3.jpg";
        }
        if (index === 3 || index === 4) {
            return  "image/tanos4.jpg";
        }
        if (index === 6) {
            return "image/tanos5.jpg";
        }
    }
    setGloves() {
        let game = this;
        this.gameField.find("td").each(function(index) {
            let $td = $(this);
            // Эмуляция случайности
            let url = game.calcGloveUrl(index);

            $td.glove = new Glove(url);
            $td.click(function () {
                game.showGlove($td);
                game.checkEnd();
            });
        });
    }
    checkEnd() {
        if (this.openCards === 9) {
            let lnk = $("#nextLink").find("a");
            const href = "https://youtu.be/4WK5ADYhm_M";
            lnk.prop("href", href);
            lnk.text(href);
            $("#description").hide();
            alert("Супер! Теперь перейдите по открывшейся ссылке");
        }
    }
    drawGrid() {
        $('<table id="grdGame" border="1" cellpadding="0" cellspacing="0">\n' +
            '        <tr>\n' +
            '            <td></td>\n' +
            '            <td></td>\n' +
            '            <td></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td></td>\n' +
            '            <td></td>\n' +
            '            <td></td>\n' +
            '        </tr>\n' +
            '        <tr>\n' +
            '            <td></td>\n' +
            '            <td></td>\n' +
            '            <td></td>\n' +
            '        </tr>\n' +
            '    </table>').appendTo(this.gameField);
    }
    draw() {
        this.drawGrid();
        this.setGloves();
    }
}

