package com.example.restservice;

public class Greeting {

    private final long id;
    private final String nome;
    private final long total;

    public Greeting(long id, String nome) {
        this.id = id;
        this.nome = nome;
        this.total = id;
    }

    public long getId() { return id; }

    public long getTotal() { return this.total; }

    public String getNome() {
        return nome;
    }

    public void setTotal(int total) {}
}