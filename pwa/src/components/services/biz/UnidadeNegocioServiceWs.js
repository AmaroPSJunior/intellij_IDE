export default class UnidadeNegocioServiceWs {
    constructor() {
        this.$http = null;
    }
    
    set http(_http) {
        this.$http = _http;
    }

    listar() {
        return new Promise((resolve, reject)=>{
            this.$http.get(`unidadeNegocio`)
                .then(response =>response.json())
                .then(list => resolve(list))
                .catch(reject);
        });
    }

    getById(id) {        
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/${id}`)
                .then(response => response.json())
                .then(uneg => resolve(uneg))
                .catch(err => {
                    if(err.status == 404) resolve(null);
                    else reject(err);
                });
        });
    }

    listarCamposAdicionais(id) {
        return new Promise((resolve, reject)=>{
            this.$http.get(`unidadeNegocio/${id}/campoAdicional`)
                .then(response =>response.json())
                .then(list => resolve(list))
                .catch(reject);
        });
    }
    
    uploadArteAniversario(id, arquivo) {
        return new Promise((resolve, reject)=>{
            let data = new FormData();
            data.append("arte", arquivo);
            this.$http.put(`unidadeNegocio/${id}/arteAniversario`, data)
            .then(response => resolve(response))
            .catch(err => {
                if(err.status == 400) 
                    resolve(null);
                else 
                    reject(err);
            });
        });
    }

    obtemArteAniversario(id){
        return new Promise((resolve, reject)=>{
            this.$http.get(`unidadeNegocio/${id}/arteAniversario`)
            .then(response => response.json())
            .then(textImg => resolve(`data:image/jpeg;base64,${textImg}`))
            .catch(err => reject(err));
        });
    }

    updateInArteAnivHabilitada(id, isArteAnivHabilitada) {
        return this.$http.put(`unidadeNegocio/${id}/inArteAnivHabilitada`, isArteAnivHabilitada);
    }

    deleteImagemAniversario(id) {
        return this.$http.delete(`unidadeNegocio/${id}/arteAniversario`);
    }

    atualizarLimiteReqApiGoogle(id, qtdReq) {
        return new Promise((resolve, reject) => {
            this.$http.post(`unidadeNegocio/${id}/reqapi`, qtdReq)
                .then(resolve)
                .catch(err => reject(err));
        });
    }

    addTermoBusca(id, termo) {
        return new Promise((resolve, reject)=>{
            this.$http.post(`unidadeNegocio/${id}/termo`, termo)
                .then(resolve)
                .catch(err=>reject(err));
        });
    }

    removerTermoBusca(id, termo) {
        return new Promise((resolve, reject)=>{
            this.$http.delete(`unidadeNegocio/${id}/termo`, {params:{termo}})
                .then(response=>response.json())
                .then(rs=>resolve(rs))
                .catch(err=>reject(err));
        });
    }

    obterListaTermos() {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/termos`)
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(err => reject(err))
        });
    }

    addJustificativa(id, justificativa) {
        return new Promise((resolve, reject)=>{
            this.$http.post(`unidadeNegocio/${id}/justificativa`, justificativa)
                .then(resolve)
                .catch(err=>reject(err));
        });
    }

    removerJustificativa(id, justificativa) {
        return new Promise((resolve, reject)=>{
            this.$http.delete(`unidadeNegocio/${id}/justificativa`, {params:{justificativa}})
                .then(response=>response.json())
                .then(rs=>resolve(rs))
                .catch(err=>reject(err));
        });
    }

    obterListaJustificativas() {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/justificativas`)
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(err => reject(err))
        });
    }

    obterQuantidadeRequisicaoPermitida() {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/quantidade/requisicao`)
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(reject);
        });
    }

    getByName(name) {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/nome`, {params:{name}})
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(reject)
        });
    }

    obterListaPcad() {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/pedidocampoadicional`)
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(reject)
        });
    }
    
    obterRoleUsers() {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/usuarole`)
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(reject)
        });
    }

    obterRoleUsersAdicionados(id) {
        return new Promise((resolve, reject) => {
            this.$http.get(`unidadeNegocio/roleusersadicionados/${id}`)
                .then(response => response.json())
                .then(rs => resolve(rs))
                .catch(reject)
        });
    }

    atualizaUserRole(id, roleUsua) {
        return new Promise((resolve, reject) => {
            this.$http.put(`unidadeNegocio/atualizaroleuser/${id}/${roleUsua}`)
                .then(rs => resolve(rs))
                .catch(reject)
        });
    }

}