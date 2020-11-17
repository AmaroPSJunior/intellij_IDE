package com.example.restservice;

public class ListagemGreeting {
    private final Greeting greeting;
    private final long total;

    public ListagemGreeting(Greeting greeting, long total) {
        this.greeting = greeting;
        this.total = total;
    }
}
