const Neurodo = require("./Neurodo");
require('./async_persistence');

class Indexadores 
{
    constructor()
    {
        
    }
    /**
     * @type {Neurodo[]}
     */
    Neurodos ()
    {
        return new Promise
        (
            async function(callback)
            {
                let data = await 'indice.js'.async_LOAD();
                eval(data);
                callback(Neurodo.indice);
            }
        );
    }
    /**
     * 
     * @param {String} txt 
     * @returns {Neurodo}
     */
    GetIndice(txt)
    {
        var t = this;
        return new Promise
        (
            async function(callback)
            {
                let neuro = await t.Neurodos();
                console.log(neuro);
                let r = neuro.find
                (
                    neu => neu.names.find(name => txt.includes(name))
                )
                callback(r);
            }
        )
    }
    /**
     * 
     * @param {String} txt 
     */
    Interpretar(txt)
    {
        var t = this;
        return new Promise
        (
            async function(callback)
            {
                let indice = await t.GetIndice(txt);

                if(indice)
                {

                }
                else//aprendiendo cual es el tema o sentido conceptual
                {
                    console.log('no hay sentido conceptual!')
                    console.log('por favor indique cual es el sentido conceptual.');

                    let simbol = await `indique un sibolo del sentido conceptual: simbol (c#) = `.TERMINAL_GET();
                    let name = await `indique un nombre del sentido conceptual: name (en c#) = `.TERMINAL_GET();
                    let dir = `sectores_neuronales/${simbol}.js`;

                    let neuro_indice = new Neurodo();
                    neuro_indice.simbol = simbol;
                    neuro_indice.names.push(name);
                    neuro_indice.dir = dir;

                    await neuro_indice.AddIndice(neuro_indice);

                    console.log('sentido conceptual agregado');

                    indice = await t.GetIndice(txt);
                    console.log(indice);
                }

                
                let split = txt.split(' ');

                for(let i = 0; i < split.length; i++)//aprendiendo
                {
                    let palabra = split[i];
                    let sector = await indice?.GetSector();//true, false: indique el sector?
                    let find = sector.find
                    (
                        neu => neu.names.find(name => name == palabra)
                    )

                    if(find)//si existe la palabra en el sector
                    {

                    }
                    else
                    {
                        console.log(`desconosco la palabra "${palabra}" del sector ${indice.simbol} podrias ayudarme respondiendo las siguientes preguntas:`);
                        let simbol = await `indique un sibolo del significado de la palabra "${palabra}": simbol = `.TERMINAL_GET();
                        let name = palabra;
                        let value = await `para el sector ${indice.simbol} que significa "${palabra}"? ${palabra} = (value) = `.TERMINAL_GET();

                        let neurodo = new Neurodo();
                        neurodo.simbol = simbol;
                        neurodo.names.push(name);
                        neurodo.values.push(value);

                        await indice.AddNeurodo(neurodo);
                    }
                }

                let sector = await indice?.GetSector();
                let r = '';
                for(let i = 0; i < split.length; i++)//leyendo, interpretando
                {
                    let palabra = split[i];
                    let find = sector.find
                    (
                        neu => neu.names.find(name => name == palabra)
                    )

                    let valor = find.values[0];
                    let is_metodo = valor.includes('__next__');//es un metodo
                    let b = r.includes('__value__');

                    //en css si a igual b entonces devuelve a + b

                    if(is_metodo)//es un metodo
                    {
                        //entonces
                        r = r.replaceAll(' __value__', '');
                        r += valor;
                        r = r.PROPS
                        ({
                            next:'__value__'
                        })
                    }
                    else//es una asignacion
                    {
                        if(b)
                        {
                            r = r.PROPS
                            ({
                                value:`${valor} __value__`
                            })
                        }
                        else
                        {
                            r += valor;
                        }
                    }
                }
                r = r.replaceAll(' __value__', '');
                callback(r);
            }
        )
    }
}
//Info@devups.io
async function Start ()
{
    let humanatica = await 'indique una expresion en lenguaje humano (ejemplo: si 1 mayor 0 entonces devuelve true en c#): '.TERMINAL_GET();
    let result = await new Indexadores().Interpretar(humanatica);
    console.log(result);
    ''.TERMINAL_CLOSE();
}
Start();
module.exports = Indexadores;
/*

    hasta ahora he visto que los neurodos tienen 2 operaciones complejas:
    1. indexar (almacena e indexa todos los almacenes o bancos de data)
    2. almacenar (almacena acciones y metodos)


    entonces tenemos:

    indexadores.
    almacenes:
        asignaciones
        metodos

*/