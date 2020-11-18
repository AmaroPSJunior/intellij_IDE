package com.example.restservice;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import static java.time.LocalDateTime.now;
import static org.springframework.web.bind.annotation.RequestMethod.GET;


@RestController
public class PessoaController {

    private static final String template = "Valor, %s!";
    private final AtomicLong counter = new AtomicLong();
    private final ArrayList<Pessoa> lista = new ArrayList<>();


    @GetMapping("/greeting")
    public Pessoa greeting(@RequestParam(value = "name", defaultValue = "value") String name) {
        Pessoa p = new Pessoa(counter.incrementAndGet(), String.format(template, name + counter));
        lista.add(p);
        int total = lista.size();

        System.out.println("total pessoa = " + total);
        return lista.get(total-1);
    }

    @RequestMapping(value = "/greeting/item/{id}", method = GET)
    public DetalhePessoa greetingID(@PathVariable(value = "id") int id) {
        System.out.println("id pessoa = " + id);
        int total = lista.size();

        if (id > 0 && id < total) {
            Pessoa p = lista.get(id-1);
            return new DetalhePessoa(p, total);
        } else {
            Pessoa p = new Pessoa(0, "item deve ser maior do que: 0 (zero)");
            return new DetalhePessoa(p, total);
        }
    }
}