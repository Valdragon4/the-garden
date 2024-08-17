window.addEventListener('DOMContentLoaded', () => {

document.getElementById('save').addEventListener('click', () => {
    
    if(document.getElementById('file').files[0] !== undefined){
        Bridge.saveFile(document.getElementById('file').files[0].path)
        return
    }

    if(document.getElementById('pseudo').value === '' || document.getElementById('cost').value === ''){
        return
    }
    if(isNaN(document.getElementById('cost').value)){
        return
    }
    if(document.getElementById('cost').value < 0 || document.getElementById('cost').value > 5){
        return
    }
    let user = {
        pseudo: document.getElementById('pseudo').value,
        cost: document.getElementById('cost').value
    }
    Bridge.saveData(user)
    document.getElementById('pseudo').value = ''
    document.getElementById('cost').value = ''
    refresh()
    refreshDraft()
})
let refresh = () => {
    let data = Bridge.loadData()
    document.getElementById('tableBody').innerHTML = ''
    let table = document.getElementById('tableBody')
    let i=0
    data.users.forEach(element => {
        i++
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        td1.innerText = element.pseudo
        td2.innerText = element.cost
        let button = document.createElement('button')
        button.innerText = 'Delete'
        button.id = "btn"+i
        td3.appendChild(button)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        table.appendChild(tr)
    });
}

refresh()

document.getElementById('tableBody').addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        let index = e.target.id.replace('btn', '')-1
        Bridge.removeData(index)
        refresh()
    }
})

document.getElementById('draft').addEventListener('click', () => {
    Bridge.draft()

})
})