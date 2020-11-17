package com.example.restservice;

public class Erro {

    private final long id;
    private final String erro;

    public Erro(long id, String erro) {
        this.id = id;
        this.erro = erro;
    }

    public long getId() { return id; }

    public String getErro() {
        return erro;
    }
}