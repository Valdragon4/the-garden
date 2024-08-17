let refreshDraft = () => {

    document.getElementById('selectionJoueurs').innerHTML = ''

    for(let i = 0; i < 10; i++){
        let select = document.createElement('select')
        select.id = 'joueur'+(i+1)
        document.getElementById('selectionJoueurs').appendChild(select)
    }

    let joueurs = Bridge.loadData().users
    console.log(Bridge.loadData().users)
    let i = 1
    joueurs.forEach(element => {
        let option = document.createElement('option')
        option.value = element.pseudo
        option.innerText = element.pseudo
        for(let i = 0; i < 10; i++){
            let clone = option.cloneNode(true)
            document.getElementById('joueur'+(i+1)).appendChild(clone)
        }
    });

    document.getElementById('Seecost').addEventListener('click', () => {
        document.getElementById('playerList').setAttribute('hidden', 'true')
        document.getElementById('draft').setAttribute('hidden', 'true')
        document.getElementById('cost').removeAttribute('hidden')
    })

    document.getElementById('Seedraft').addEventListener('click', () => {
        document.getElementById('playerList').setAttribute('hidden', 'true')
        document.getElementById('draft').removeAttribute('hidden')
        document.getElementById('cost').setAttribute('hidden', 'true')

    })

    document.getElementById('Seelist').addEventListener('click', () => {
        document.getElementById('playerList').removeAttribute('hidden')
        document.getElementById('draft').setAttribute('hidden', 'true')
        document.getElementById('cost').removeAttribute('hidden')
    })




    document.getElementById('draftButton').addEventListener('click', () => {
        let joueurs = []
        
        for(let i = 0; i < 10; i++){
            let select = document.getElementById('joueur'+(i+1))
            let option = select.options[select.selectedIndex]
            let user = Bridge.loadData().users.find(element => element.pseudo === option.value)
            joueurs.push(user)
        }

        console.log(joueurs)

        document.getElementById('draftTableBody').innerHTML = ''
        document.getElementById('costsResult').innerText = ''
        document.getElementById('costsResult2').innerText = ''
        document.getElementById('costsEquipes').removeAttribute('hidden')
        let equipe1 = []
        let equipe2 = []
        let costEquipe1 = 0
        let costEquipe2 = 0
        for(let i = 0; i < 10; i++){
            let number = Math.floor(Math.random() * joueurs.length)
            let select = joueurs[number]
            if(equipe1.length < 5 && equipe2.length < 5){
                if(Math.floor(Math.random() * 2) % 2 === 0){
                    equipe1.push(select)
                }else{
                    equipe2.push(select)
                }
            }else if(equipe1.length < 5){
                equipe1.push(select)
            }
            else if(equipe2.length < 5){
                equipe2.push(select)
            }
            joueurs.splice(number, 1)
        }
        equipe1.forEach(element => {
            costEquipe1 += parseInt(element.cost)
        })
        equipe2.forEach(element => {
            costEquipe2 += parseInt(element.cost)
        })
        document.getElementById('costsResult').innerText = "Equipe 1 :"
        document.getElementById('costsResult').innerText = costEquipe1
        document.getElementById('costsResult2').innerText = "Equipe 2 :"
        document.getElementById('costsResult2').innerText = costEquipe2
        for(let i = 0; i < 5; i++){
            let tr = document.createElement('tr')
            let td1 = document.createElement('td')
            let td2 = document.createElement('td')
            td1.innerText = equipe1[i].pseudo
            td2.innerText = equipe2[i].pseudo
            tr.appendChild(td1)
            tr.appendChild(td2)
            document.getElementById('draftTableBody').appendChild(tr)
        }
    })
}

window.document.addEventListener('DOMContentLoaded', () => {

    refreshDraft()
})