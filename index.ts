import { DictionaryRepository } from './dictionary.repository';
import fs = require('fs');
const mongoose = require('mongoose');
const readline = require('readline');

export const index = function() {
        const testFolder = 'files';
        const repo = new DictionaryRepository(mongoose, 'Dictionary');
        fs.readdir(testFolder, (err, files) => {
            for (let i = 0; i < files.length; i++) {
                let counter: number = 0;
                const lineReader = readline.createInterface({
                    input: fs.createReadStream(`files\\${files[i]}`),
                });
                lineReader.on('line', function(line) {
                    const array = line.split(' ');
                    for (let j = 0; j < array.length; j++) {
                        repo.addWord(files[i], array[j], counter);
                    }
                    counter++;
                });
            }
        });
}

export const search = async function(request: string){
    const repo = new DictionaryRepository(mongoose, 'Dictionary');
    return await repo.search(request);
}