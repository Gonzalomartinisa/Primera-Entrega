const fs = require('fs');
const { readFile } = require('fs/promises');

class Contenedor{
    constructor(filename){
        this.filename = filename       
    }

    async save(obj){
        let info = []
        try{
            info = await this.getInfo()
        } catch(err) {
            console.log('No hay archivo')
        }
        
        let lastID = 1
        if (info.length > 0) {
            lastID = info[info.length -1].id + 1
        }

        obj.id = lastID
        info.push(obj)

        await this.writeInfo(info)

        return obj
    }

    async deleteById(id){
        const info = await this.getInfo()
        const index = info.findIndex(d => d.id == id)
        const obj = info.splice(index, 1)
        await this.writeInfo(info)
        return obj
    } 

    async deleteAll(){
        const info = await this.getInfo()
        const obj = []
        await this.writeInfo(obj)
        return obj
    } 

    async getById(id){
        const info = await this.getInfo()
        const index = info.find(d => d.id == id)
        return index 
    }

    async getAll(){
        const info = await this.getInfo()
        return info
    }

    getInfo(){
        return fs.promises.readFile(this.filename, 'utf-8')
            .then(i => JSON.parse(i))
    }

    writeInfo(info){
        const string = JSON.stringify(info)
        return fs.promises.writeFile(this.filename, string)
    }   
}

module.exports = Contenedor;
