package com.example.restservice;

public class DetalhePessoa {
    private final Pessoa pessoa;
    private final int total;

    public DetalhePessoa(Pessoa pessoa, int total) {
        this.pessoa = pessoa;
        this.total = total;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public int getTotal() {
        return total;
    }
}
