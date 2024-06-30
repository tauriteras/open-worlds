// This function is hosted on google cloud functions

export function generateWorld() {

    let x = 1;
    let y = 1;

    let width = 10
    let height = 56

    let entryX = Math.floor(Math.random() * width)

    if (entryX < 1) {
        entryX = 1;
    }

    let worldData = {
        freshGeneration: true,
        blocks: [],
        size: {
            width: width,
            height: height 
        }
    }

    for (let i = 0; i < (width * height); i++) {

        let random = Math.floor(Math.random() * 100)

        let block = [2, {}]

        // 4 Rows of bedrock
        if (y <= 4) {
            worldData.blocks.push([1, {}])
        }

        // Dirt, Lava, Stone
        if (y > 4 && y <= 23) {

            // Spawn lava
            if (y <= 9 && random < 30) {
                block = [4, {}]
            }

            // Spawn stone
            if ((y > 9 && y <= 19) && random < 15 ) {
                block = [3, {}]
            }

            // Spawn bedrock under entry door
            if (y === 23 && x === entryX) {
                block = [1, {}]
            }

            worldData.blocks.push(block)
        }

        if (y > 23) {

            block = [0, {}]

            if (y === 24 && x === entryX) {
                block = [6, {}]
            }

            worldData.blocks.push(block)
        }

        if (x === width) {
            x = 0;
            y++;
        }

        x++; 

    }

    return worldData;

}