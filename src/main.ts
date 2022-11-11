import { read, readdirSync, stat, statSync } from "node:fs";
import { exit } from "node:process";

function readAlgorithm() {
    return readdirSync("src")
        .filter(e => statSync(`src/${e}`).isDirectory())
        .map(e => {
            return {
                groupName: e,
                algorithm: readdirSync(`src/${e}`)
                    .filter(e => e.endsWith('.ts'))
                    .map(e => e.substring(0, e.length - 3)),
            }
        });
}

function displayHelp(algoritmhGroup: { groupName: string, algorithm: string[] }[]) {
    console.log("Usage: node src/main.js ALGO")
    console.log("Algo being one of:")

    for (const group of algoritmhGroup) {
        console.log(`   ${group.groupName}`)
        for (const algo of group.algorithm) {
            console.log(`       ${algo}`)
        }
    }

}

let algoritmhGroup = readAlgorithm();

if (process.argv.length <= 2) {
    displayHelp(algoritmhGroup);
    exit()
}

let requestedAlgo = process.argv[2];

let selectedGroup = algoritmhGroup.find(current => current.algorithm.find(e => e === requestedAlgo))

if (!selectedGroup) {
    console.log(`requested algorithm ${requestedAlgo} not found`)
    displayHelp(algoritmhGroup);
    exit()
}

let selectedAlgo = selectedGroup.algorithm.find(e => e === requestedAlgo)


import(`./${selectedGroup.groupName}/${selectedAlgo}.js`).then(e => e.default())