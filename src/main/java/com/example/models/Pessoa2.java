package com.example.models;

import javax.persistence.*;
import java.io.Serializable;

;


@Entity
@Table(name="PESSOA")
public class Pessoa2 implements Serializable {

//    public static final SerializableVarUID = 1L;

    @Id
    @SequenceGenerator(name = "ID", sequenceName = "SEQ_ID", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ID")
    @Column(name = "ID")
    private long id;
    private String nome;

    @Column(name = "URI")
    private String uri;

    @Column(name = "TESTE")
    private String teste = "data-teste";

    public Pessoa2(long id, String nome) {
        this.id = id;
        this.nome = nome;
        this.uri = "/pessoa/id/" + id;
        this.teste = "teste - ";
    }

    public void setTeste(String teste) { this.teste = teste; }

    public String getTeste() { return teste; }
    public long getId() { return id; }
    public String getNome() { return nome; }
    public String getUri() { return uri; }
}
