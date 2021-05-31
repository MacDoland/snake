
class SpriteSheet {
    #spriteSheet;
    // #spriteSheetLoaded;
    #sprites;

    constructor(imagePath) {
        this.#spriteSheet = document.createElement('img');
        //this.#spriteSheetLoaded = false;

        // this.#spriteSheet.addEventListener('load', () => {
        //     this.#spriteSheetLoaded = true;
        // });

        this.#spriteSheet.src = imagePath;
        this.#sprites = {};
    }

    addSprite(key, x, y, width, height) {
        this.#sprites[key] = {
            spriteSheet: this.#spriteSheet,
            x,
            y,
            width,
            height
        };
    }

    getSprite(key) {
        return this.#sprites[key];
    }
}

export default SpriteSheet;