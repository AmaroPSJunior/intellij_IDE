import { Validator } from 'vee-validate';
import Vue from 'vue';
import StHelper from './StHelper';

const cnpjRule = {
    getMessage: field =>  `O CNPJ está inválido [${field}]`,
    validate : value => StHelper.validarCnpj(value)
};

export default class VueCustomRegisterer {
    constructor() {
        Vue.filter('grana', StHelper.formatReal);
        Vue.filter('percAcrescimoDesconto', StHelper.formatPercAcrescimoDesconto);
        Vue.filter('acrescimoDesconto', StHelper.formatValorAcrescimoDesconto);
        Vue.filter('granars', StHelper.formatRealSimbolo);
        Vue.filter('data', StHelper.formatData);
        Vue.filter('datahora', StHelper.formatDataHora);
        Vue.filter('firstName', StHelper.firstName);
        Vue.filter('telefone', StHelper.formataTelefone);
        Vue.filter('volume', StHelper.formatVolume);
        Vue.filter('cnpj', this._formataCNPJ);
        Vue.filter('ativoinativo', this._formataAtivoInativo);
        Vue.filter('inremovido', this._formataInRemovido);
        // Vue.filter('muitosDescontos', arr=>{
        //     let m = '';
        //     arr.forEach(el=>{
        //         if (el) m+=`${StHelper.formatReal(el)} +`;
        //     });
        //     return m.substring(0,m.length-2);
        // });

        Validator.extend('cnpj', cnpjRule);
        this._definesClicableToast();

    }

    _formataCNPJ(cnpj){
        if (typeof(cnpj) == 'number') cnpj = `${cnpj}`;
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

    _definesClicableToast () {
        let toastValue = null;
        Vue.directive('clickableToast',{
            bind: function(el, binding, vnode) {
                toastValue = binding.value;
                el.addEventListener('click',function(){
                    StHelper.toast(toastValue,3000);
                });
            },
            update: function(el, binding, vnode) {
                toastValue = binding.value;
            }
        });
    }

    _formataAtivoInativo(val) {
        if(val || 'S' == val) {
            return 'ATIVO';
        }

        return 'INATIVO';
    }

    _formataInRemovido(val) {
        if(val || 'S' == val) {
            return 'REMOVIDO';
        }

        return 'ATIVO';
    }
}
