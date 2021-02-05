package com.example.restservice;

import com.example.models.Pessoa;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import static org.springframework.web.bind.annotation.RequestMethod.GET;


@RestController
public class PessoaController {

    private static final String template = "Sr. %s";
    private final AtomicLong counter = new AtomicLong();
    private final ArrayList<Pessoa> lista = new ArrayList<>();

    @PostMapping("/novaPessoa")
    public Pessoa novaPessoa(@RequestBody() Pessoa dadosPessoa) {
        System.out.println("Class = " + dadosPessoa);
        Pessoa p = new Pessoa(counter.incrementAndGet(), String.format("Sr. %s", dadosPessoa.getNome() + " - " + counter, 100));
        p.setTeste("Teste - " + dadosPessoa.getNome());
        lista.add(p);
        int total = lista.size();



        return lista.get(total-1);
    }

    @GetMapping("/pessoa")
    public List<Pessoa> pessoa() {
        return lista;
    }

    @RequestMapping(value = "/pessoa/id/{id}", method = GET)
    public DetalhePessoa pessoaID(@PathVariable(value = "id") int id) {
        int total = lista.size();

        if (id > 0 && id <= total) {
            Pessoa p = lista.get(id-1);
            return new DetalhePessoa(p, total);
        } else {
            Pessoa p = new Pessoa(0, "id inválido");
            return new DetalhePessoa(p, total);
        }
    }

    @GetMapping("/teste")
    public String teste() {
        return "<h1>Teste6</h1>";
    }
}