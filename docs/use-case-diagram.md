# Diagrama de Caso de Uso

```mermaid
---
title: Diagrama de Casos de Uso - Sistema de Adestramento de Animais
---

flowchart LR

    U["👤 Usuário"]

    subgraph Sistema["Sistema de Adestramento"]

        C1(("Cadastrar conta"))
        C2(("Fazer login"))

        P1(("Cadastrar pet"))
        P2(("Editar pet"))

        CU1(("Visualizar cursos"))
        CU2(("Pesquisar cursos"))
        CU3(("Matricular pet no curso"))

        A1(("Visualizar aulas"))
        A2(("Assistir aula"))
        A3(("Registrar conclusão da aula"))

        PR1(("Visualizar progresso"))
        PR2(("Concluir curso"))
        PR3(("Avaliar curso"))

    end

    U --> C1
    U --> C2
    U --> P1
    U --> P2
    U --> CU1
    U --> CU3
    U --> A1
    U --> PR1
    U --> PR2
    U --> PR3

    CU1 -. include .-> CU2
    CU3 -. include .-> CU1

    A1 -. include .-> A2
    A2 -. include .-> A3

    A3 -. include .-> PR1
    PR2 -. include .-> PR1

    PR3 -. extend .-> PR2
```