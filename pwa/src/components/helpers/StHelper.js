const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'decimal',
	//currency: 'BRL',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const formatterSimbolo = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	currencyDisplay: 'symbol',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const formatterCubagem = new Intl.NumberFormat('pt-BR', {
	style: 'decimal',
	minimumFractionDigits: 4,
	maximumFractionDigits: 4
});

const dateFormatter = new Intl.DateTimeFormat('pt-BR');
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});

let materialSelectCounter = 0;

import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-BR');

export default class StHelper {

    constructor() {

        throw new Error('Esta classe não pode ser instanciada');
    }

    static equals(obj1, obj2) {
        let v1 = JSON.stringify(obj1);
        let v2 = JSON.stringify(obj2);
        return v1 == v2;
    }

    static clone(obj) {
        let json = JSON.stringify(obj);
        return JSON.parse(json);
    }

    static formatReal(vl) {
        return formatter.format(vl?vl:0);
    }
    static formatPercAcrescimoDesconto(vl) {
        let v = formatter.format(vl?vl:0);
        if (v.startsWith('-')) v = v.replace('-','+');
        return v;
    }
    static formatValorAcrescimoDesconto(vl) {
        let v = formatterSimbolo.format(vl?vl:0);
        if (v.startsWith('-')) v = v.replace('-','+');
        return v;
    }

    static formatRealSimbolo(vl) {
        return formatterSimbolo.format(vl?vl:0);
    }

    static formatVolume(vl) {
        return formatterCubagem.format(vl?vl:0);
    }

    static formatData(vl) {
        if (vl) {
            let dt = new Date(vl);
            return dateFormatter.format(dt);
        } else {
            return '';
        }

    }
    static formatDataHora(vl) {
        if (vl) {
            let dt = new Date(vl);
            return dateTimeFormatter.format(dt);
        } else {
            return '';
        }
    }

    static toDateInput(vl) {
        if (vl) {
            if (vl.toISOString) {
                vl = vl.toISOString();
            }
            return vl.split('T')[0];
        } 
        return vl;
    }

    static firstName(string) {
        if (string && string.includes(' ')) {
            return string.split(' ')[0];
        } else {
            return string;
        }
    }

    /**
     * Default datepicker initializer for mercantio, the initializer can be customized with other materialize datepicker options
     * through the parameter extraOptions. 
     * (for more info about datepicker options, see the documentation in the link https://materializecss.com/pickers.html) 
     * 
     * Eg. StHelper.setDefaultDatePicker(referenceOfMyDatePicker, {minDate: new Date()});
     * 
     * @param {any} selector // DOM materialize datepicker reference
     * @param  {...Object} datePickerOptions 
     */
    static setDefaultDatePicker(selector, ...datePickerOptions) {
        let options = {
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            i18n: {
                clear:'Limpar', 
                done:'Ok',
                cancel:'Cancelar',
                months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                monthsShorts: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                nextMonth: 'Próximo Mês',
                previousMonth: 'Mês Anterior',
                labelMonthSelect: 'Selecione um mês',
                labelYearSelect: 'Selecione um ano',
                weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
                weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
                weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
                today: 'Hoje',
            }, 
            format: 'dd/mm/yyyy',
        };
        datePickerOptions.forEach(option => Object.keys(option).forEach(key => options[key] = option[key]));
        M.Datepicker.init(selector, options);
    }

    static arredondar(num, casas) {
        let fator = 0;
        if (casas == 2) fator = 100;
        else if (casas == 4) fator = 10000;
        else fator = Math.pow(10,casas?casas:2);
        return StHelper.fastRound(num * fator) / fator;
    }

    static fastRound(n) {
        return (n + 0.5) << 0;
    }

    static idFromResponse(response) {
        let localizacao = response.headers.get('Location');
        if (localizacao) {
            let arr = localizacao.split('/');
            let codigo = arr[arr.length - 1];
            return parseInt(codigo);
        } else {
            return null;
        }
    }

    static idStringFromResponse(response) {
        let localizacao = response.headers.get('Location');
        if (localizacao) {
            let arr = localizacao.split('/');
            let codigo = arr[arr.length - 1];
            return codigo;
        } else {
            return null;
        }
    }
    
    static range (start, end) { return [...Array(1+end-start).keys()].map(v => start+v) };


	static lpad(str, padString, length) {
		str = str+'';
		while (str.length < length)
			str = padString + str;
		return str;
	}

    static removeCaracteresEspeciais(inputString) {
        let exp = /\^|~|\?|,|\*|\.|\-|\//g;
        return inputString.replace(exp, "");
    }

    static validaFormatoEmail(email) {
        let exp = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}/g;
        return exp.test(email);
    }

    static formataTelefone(tel) {
        if (!tel) {
            return '';
        } else if (tel.length == 11) {
            let formatted = tel.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            return formatted;
        } else if (tel.length == 10){
            let formatted = tel.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
            return formatted;
        } else {
            return tel;
        }
    }

    static toastAlerta(msg, time) {
        if(msg) {
            if(time) {
                M.toast({html:msg, classes:'deep-orange darken-3', displayLength:time});
            } else {
                M.toast({html:msg, classes:'deep-orange darken-3'});
            }
        }
    }

    static toastAlertaPositive(msg, time) {
        if(msg) {
            if(time) {
                M.toast({html:msg, classes:'green darken-3', displayLength:time});
            } else {
                M.toast({html:msg, classes:'green darken-3'});
            }
        }
    }

    static toast(msg, time) {
        if(msg) {
            if(time) {
                M.toast({html:msg, displayLength:time});
            } else {
                M.toast({html:msg});
            }
        }
    }
    
    static quebraLinha(texto) {
        if (texto) {
            return texto.replace(/<<csr>>/g,'<br>').replace(/\n/g,'<br>').replace(/<<csq>>/g,'<br>');
        } else {
            return '';
        }
    }

    static _filteredComponents(arr) {
        let toUpdate = [];
        if (arr) {
            if (arr.forEach) {
                arr.forEach(el=>{
                    if (el) toUpdate.push(el);
                });
            } else {
                toUpdate.push(arr);
            }
        }
        return toUpdate;
    }

    static updateMaterializeFields(arr ) {
        let elements = StHelper._filteredComponents(arr);
        M.updateTextFields(elements);         
    }

    static activateMaterialSelect(arr) {
        let elements = StHelper._filteredComponents(arr);
        materialSelectCounter = 0;
        let el = $(elements);
        el.formSelect();
        el.off('change');
        el.on('change', function() {
            materialSelectCounter++;
            if (materialSelectCounter == 1) {
                let event = new CustomEvent('change', {
                    detail: 'change',
                    bubbles: true
                });
                $(this).get(0).dispatchEvent(event);
            } else if (materialSelectCounter >= 2) {
                materialSelectCounter = 0;
            }
        });
    }
    
    // static validarCnpj(cnpj) {
    //     let exp = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g;
    //     return exp.test(cnpj);
    // }

    static validarCnpj(cnpj) {
        
           cnpj = cnpj.replace(/[^\d]+/g,'');
           cnpj = StHelper.lpad(cnpj,'0',14);
        
           if(cnpj == '') return false;
            
           if (cnpj.length != 14)
               return false;
        
           // Elimina CNPJs invalidos conhecidos
           if (cnpj == "00000000000000" || 
               cnpj == "11111111111111" || 
               cnpj == "22222222222222" || 
               cnpj == "33333333333333" || 
               cnpj == "44444444444444" || 
               cnpj == "55555555555555" || 
               cnpj == "66666666666666" || 
               cnpj == "77777777777777" || 
               cnpj == "88888888888888" || 
               cnpj == "99999999999999")
               return false;
                
           // Valida DVs
           let tamanho = cnpj.length - 2
           let numeros = cnpj.substring(0,tamanho);
           let digitos = cnpj.substring(tamanho);
           let soma = 0;
           let pos = tamanho - 7;
           for (let i = tamanho; i >= 1; i--) {
             soma += numeros.charAt(tamanho - i) * pos--;
             if (pos < 2)
                   pos = 9;
           }
           let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
           if (resultado != digitos.charAt(0))
               return false;
                
           tamanho = tamanho + 1;
           numeros = cnpj.substring(0,tamanho);
           soma = 0;
           pos = tamanho - 7;
           for (let i = tamanho; i >= 1; i--) {
             soma += numeros.charAt(tamanho - i) * pos--;
             if (pos < 2)
                   pos = 9;
           }
           resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
           if (resultado != digitos.charAt(1))
                 return false;
                  
           return true;
       }
    
    /**
     *  Compara o mês entre duas datas, retorna 0 caso os meses sejam iguais, retorna 1 caso o primeiraData seja maior que 
     *  a segunda, retorna -1 caso a primeiraData seja menor que a segunda.
     * @param {Date} primeiraData 
     * @param {Date} segundaData 
     */
    static compararMesEntreDatas(primeiraData, segundaData){        
        return moment.default(primeiraData).month()==moment.default(segundaData).month()?0:moment.default(primeiraData).month()<moment.default(segundaData).month()?-1:1;
    }

    static findGetParameter(parameterName) {
        let result = null,
            tmp = [],
            initialSearchIndex = location.hash.search(/\?/g) + 1;
        location.hash
            .substr(initialSearchIndex)
            .split("&")
            .forEach(function(item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }

    /**
     *  Recebe uma string no formato DD/MM/YYYY (formato padrão da string que os datepickers do materialize retorna)
     *  e retorna uma data do tipo nativo do javascript
     * @param {String} stringDate 
     */
    static stringToDate(stringDate) {
        if (stringDate) {
            let year = stringDate.substr(6,4), month = stringDate.substr(3,2), day = stringDate.substr(0,2);
            return new Date(year, --month, day);
        } else {
            return null;
        }
    }
    
    /**
     *  Compara duas datas, retorna 0 caso elas sejam iguais, retorna 1 caso o primeiraData seja maior que 
     *  a segundaData, retorna -1 caso a primeiraData seja menor que a segundaData.
     * @param {Date} primeiraData 
     * @param {Date} segundaData 
     */
    static compararDatas(primeiraData, segundaData) {
        return moment.default(primeiraData).isSame(segundaData, 'day')?0:moment.default(primeiraData, 'day').isBefore(segundaData)?-1:1;
    }

    static tratarDate(dt) {
		if (!(dt instanceof Date)) {
			if (dt.includes('/')) {
				dt = moment.default(dt, "DD/MM/YYYY").toDate();
			} else {
				dt = new Date(dt);
			}
		}
		return dt;
    }
    
    static dateToIso8601(data){
        let dt = this.tratarDate(data);
        return moment.default(dt).format();
    }

	static truncateDate(dt) {
		if (dt) {
			dt = StHelper.tratarDate(dt);
			let nd = new Date(dt.getTime());
			nd.setHours(0,0,0);
			return nd;
		} else {
			return null;
		}
	}
	static firstDayOfYear(dt) {
		if (dt) {
			dt = StHelper.tratarDate(dt);
			let nd = new Date(dt.getTime());
            nd.setHours(0,0,0);
            nd.setDate(1);
            nd.setMonth(0);
			return nd;
		} else {
			return null;
		}
	}

	static endOfDay(dt) {
		if (dt) {
			dt = StHelper.tratarDate(dt);
			let nd = new Date(dt.getTime());
			nd.setHours(23,59,59);
			return nd;
		} else {
			return null;
		}
	}

	static dateEquals(dt1, dt2) {
		return dt1.getFullYear() === dt2.getFullYear() &&
			dt1.getMonth() === dt2.getMonth() &&
			dt1.getDate() === dt2.getDate();
	}

    static dateIsBetween(dt, dtFrom, dtTo) {
        if (!dt) return false;
        return StHelper.truncateDate(dt) >= StHelper.truncateDate(dtFrom) 
            && StHelper.truncateDate(dt) <= StHelper.truncateDate(dtTo) ;
    }

	static isToday(dt) {
		return StHelper.dateEquals(new Date(), dt);
	}

	static booleanToSn(bol) {
		return bol?'S':'N';
	}
	static snToBoolean(sn) {
		return sn === 'S' || sn === 's'? true:false;
	}
	
	static safeTrim(v) {
		if (!v) return '';
		else v.trim();
    }
    
    static getLocalStorageItem(key, defaultValue) {
        let ret = localStorage.getItem(key);
        if (!ret || ret == 'undefined') {
            return defaultValue;
        } else {
            return ret;
        }
    }

    /**
     * Adiciona a quantidade de dias passados no parâmetro days a data informada na variavel date
     * 
     * @param {Date} date 
     * @param {int} days 
     */
    static adicionarDias(date, days) {            
        return moment.default(date).add(days, 'd').toDate(); 
    }

    /**
     * Adiciona a quantidade de mêses passados no parâmetro months a data informada na variavel date
     * 
     * @param {Date} date 
     * @param {int} months 
     */
    static adicionarMeses(date, months) {            
        return moment.default(date).add(months, 'M').toDate(); 
    }

    /**
     * Adiciona a quantidade de anos passados no parâmetro years a data informada na variavel date
     * 
     * @param {Date} date 
     * @param {int} years 
     */
    static adicionarAnos(date, years) {            
        return moment.default(date).add(years, 'y').toDate(); 
    }

    /**
     * Adiciona a quantidade de horas passados no parâmetro hours a data informada na variavel date
     * 
     * @param {Date} date 
     * @param {int} hours 
     */
    static adicionarHoras(date, hours) {            
        return moment.default(date).add(hours, 'h').toDate(); 
    }

    /**
     * Adiciona a quantidade de minutos passados no parâmetro minutes a data informada na variavel date
     * 
     * @param {Date} date 
     * @param {int} minutes 
     */
    static adicionarMinutos(date, minutes) {            
        return moment.default(date).add(minutes, 'm').toDate(); 
    }

    /**
     * Adiciona a quantidade de segundos passados no parâmetro seconds a data informada na variavel date
     * 
     * @param {Date} date 
     * @param {int} seconds 
     */
    static adicionarSegundos(date, seconds) {            
        return moment.default(date).add(seconds, 's').toDate(); 
    }

    static calcularDiasAteHoje(dt) {
        return moment.default().diff(dt,'days');		
    }

    /**
     *  Retorna uma função de ordenação dinamica de objetos para ser utilizado em conjunto com o método sort do javascript.
     *  recebe como argumento o nome da propriedade (String) que deve ser considerada para ordenação. Para ordenar em ordem decrescente
     *  deve-se informar um sinal de "-" (menos) na frente do parâmetro.
     * @param {*} property 
     */
    static dynamicArraySort(property){
        let sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        let orderKeyValue = '',
        listaProperties = property.split('.'),
        returnExpression = '';
        listaProperties.forEach(prop => orderKeyValue += `['${prop}']`);

        return function (a, b) {
            // debugger;
            if (sortOrder == -1) return eval(`b${orderKeyValue}.localeCompare(a${orderKeyValue});`);
            else return eval(`a${orderKeyValue}.localeCompare(b${orderKeyValue});`);
        }
    }

    /**
     * Retorna a diferença especificada na unidade de medida entre duas datas.
     * @param {Date} primeiraData - Primeira data a ser comparada
     * @param {Date} segundaData - Segunda data a ser comparada
     * @param {String} unidadeMedida - Unidade de medida podendo ser 'years', 'months', 'weeks', 'days', 'hours', 'minutes' e 'seconds'.
     */
    static dateDiff(primeiraData, segundaData, unidadeMedida) {
        let diff = null;
        try {
            diff = moment.default(primeiraData).diff(segundaData, unidadeMedida);
        } catch(e) {
            throw new Error(`Não foi possível obter a diferença entre duas datas: \n ${e}`);
        } finally {
            return diff <  0?diff * -1:diff;
        }
    }

    /**
     * Função para validar se alguma unit está presente no menu.
     * @param {String} unit - nome da unit vinculada a permissão a ser validada.
     * @param {MenusAutorizados} menus - lista com os itens de menu autorizados.
     */
    static validarPermissao(unit, menus){
        try{
            // filtra o grupo do menu que contem a opção a ser buscada.
            const men = menus.filter(function(menu){
                return  menu.itens.some(function(item) {
                    return item.unit === unit;
               });    
            });
            
            return men && men.length >= 1;
        } catch(e) {
            return false;
        }
    }
}