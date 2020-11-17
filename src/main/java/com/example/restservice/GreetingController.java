package com.example.restservice;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import static java.time.LocalDateTime.now;
import static org.springframework.web.bind.annotation.RequestMethod.GET;


@RestController
public class GreetingController {

    private static final String template = "Valor, %s!";
    private final AtomicLong counter = new AtomicLong();
    private final ArrayList<Greeting> lista = new ArrayList<>();


    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "value") String name) {
        Greeting item = new Greeting(counter.incrementAndGet(), String.format(template, name + counter));
        lista.add(item);
        int total = lista.size();
        item.setTotal(total);

        System.out.println("total = " + total);
        return lista.get(total-1);
    }

    @RequestMapping(value = "/greeting/item/{id}", method = GET)
    public ListagemGreeting greetingID(@PathVariable(value = "id") int id) {
        System.out.println("id = " + id);
        Greeting item = new Greeting(0, "item deve ser maior do que: 0 (zero)");
        int total = lista.size();

        if (id > 0 && id < total) return new ListagemGreeting(lista.get(id-1), total);
        else return new ListagemGreeting(item, total);
    }
}