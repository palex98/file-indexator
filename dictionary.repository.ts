import { Word } from './word.model';
const MongooseRepository = require('mongoose-repository');

export class DictionaryRepository extends MongooseRepository {
    constructor(mongoose, modelName) {
        super(mongoose, modelName);
        mongoose.connect('mongodb://localhost:27017/search-engine', { useNewUrlParser: true });
      }

  public addWord(file: string, word: string, line: number) {
    const newWord = new Word({
        file,
        word,
        line,
    });
    Word.create(newWord, function(err, doc){
        if (err) { return console.log(err); }
        console.log(doc);
    });
  }

  public async search(query: string): Promise<string>{
    const result = await Word.find({word: `${query}`});
    return result;
  }
}