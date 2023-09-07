class Neurodo
{
    constructor(obj)
    {
        /**
         * @type {String}
         */
        this.simbol = obj ? obj?.simbol : '';
        /**
         * @type {String[]}
         */
        this.names = obj ? obj?.names : [];
        /**
         * @type {Neurodo[] | String}
         */
        this.values = obj ? obj?.values : [];
        /**
         * @type {String}
         */
        this.dir = obj ? obj?.dir : '';
    }
    /**
     * 
     * @returns {Neurodo[]}
     */
    GetSector()
    {
        var t = this;
        return new Promise
        (
            async function(callback)
            {
                let r = await t.dir.async_LOAD();
                eval(r);
                callback(Neurodo.enfoque);
            }
        )
    }
    /**
     * 
     * @param {Neurodo} add 
     * @returns {Promise}
     */
    AddNeurodo(add)
    {
        var t = this;
        return new Promise
        (
            async function(callback)
            {
                let sector = await t.dir.async_LOAD();
                sector = sector.PROPS
                ({
                    value:
                    `new Neurodo(${add.TO_JSON()}),
    /*value*/`
                })
                await t.dir.async_SAVE(sector)
                callback(sector);
            }
        );
    }
    AddIndice(add_indice)
    {
        console.log('ADD INDICE START')
        var t = this;
        let sector_body =
`Neurodo.enfoque =
[
    /*value*/
]`
;
        let indice_dir = 'indice.js';
        return new Promise
        (
            async function(callback)
            {
                let indice = await indice_dir.async_LOAD();
                indice = indice.PROPS
                ({
                    value:
                    `new Neurodo(${add_indice.TO_JSON()}),
    /*value*/`
                })
                await indice_dir.async_SAVE(indice);
                await t.dir.async_SAVE(sector_body)
                console.log('ADD INDICE END')
                callback(indice);
            }
        );
    }
}
Neurodo.enfoque = [];
Neurodo.indice = [];
module.exports = Neurodo;