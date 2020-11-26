package com.example.restservice;

public class Pessoa {
    private final long id;
    private final String nome;
    private final String uri;

    public Pessoa(long id, String nome) {
        this.id = id;
        this.nome = nome;
        this.uri = "/pessoa/id/" + id;
    }

    public long getId() { return id; }

    public String getNome() {
        return nome;
    }

    public String getUri() {
        return uri;
    }
}