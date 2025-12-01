let participantes = [
    {
        nome: "Luiz Molra",
        email: "Luiz@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 22, 0)
    },
    {
        nome: "Tania Oliveira",
        email: "Tania.oliveira@gmail.com",
        dataInscricao: new Date(2024, 3, 10, 14, 30),
        dataCheckIn: new Date(2024, 3, 12, 9, 15)
    },
    {
        nome: "Carlos Mendes",
        email: "carlos.mendes@gmail.com",
        dataInscricao: new Date(2024, 2, 24, 14, 40),
        dataCheckIn: new Date(2024, 2, 27, 18, 10)
    },

    {
        nome: "Julia Santos",
        email: "julia.santos@gmail.com",
        dataInscricao: new Date(2024, 2, 20, 8, 50),
        dataCheckIn: new Date(2024, 2, 23, 11, 5)
    },

    {
        nome: "Marcos Oliveira",
        email: "marcos.oliveira@gmail.com",
        dataInscricao: new Date(2024, 2, 21, 16, 5),
        dataCheckIn: new Date(2024, 2, 24, 20, 45)
    },

    {
        nome: "Fernanda Costa",
        email: "fernanda.costa@gmail.com",
        dataInscricao: new Date(2024, 2, 19, 9, 25),
        dataCheckIn: new Date(2024, 2, 22, 17, 15)
    },

    {
        nome: "Rafael Almeida",
        email: "rafael.almeida@gmail.com",
        dataInscricao: new Date(2024, 2, 18, 13, 55),
        dataCheckIn: new Date(2024, 2, 21, 19, 30)
    },

    {
        nome: "Patricia Nunes",
        email: "patricia.nunes@gmail.com",
        dataInscricao: new Date(2024, 2, 25, 11, 0),
        dataCheckIn: new Date(2024, 2, 28, 15, 50)
    },

    {
        nome: "Eduardo Lima",
        email: "eduardo.lima@gmail.com",
        dataInscricao: new Date(2024, 2, 17, 17, 45),
        dataCheckIn: new Date(2024, 2, 20, 8, 40)
    },

    {
        nome: "Beatriz Rocha",
        email: "beatriz.rocha@gmail.com",
        dataInscricao: new Date(2024, 2, 26, 7, 10),
        dataCheckIn: new Date(2024, 2, 29, 14, 0)
    },

    {
        nome: "Gustavo Ferreira",
        email: "gustavo.ferreira@gmail.com",
        dataInscricao: new Date(2024, 2, 15, 12, 20),
        dataCheckIn: new Date(2024, 2, 18, 16, 55)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if (participante.dataCheckIn == null) {
        dataCheckIn = `
        <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)">
        Confirmar check-in
        </button>
        `
    }

    return `
                <tr>
                <td>
                    <strong>${participante.nome}</strong>
                    <br>
                    <small>${participante.email}</small>
                </td>
                <td>${dataInscricao}</td>
                <td>${dataCheckIn}</td>
            </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    for (let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const participante = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(
        (p) => p.email == participante.email
    )

    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if (confirm(mensagemConfirmacao) == false) {
        return
    }

    const participante = participantes.find((p) => p.email == event.target.dataset.email)

    participante.dataCheckIn = new Date()

    atualizarLista(participantes)
}
