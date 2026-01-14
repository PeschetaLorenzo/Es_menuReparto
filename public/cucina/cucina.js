window.onload =  ()=>{
    getOrdini()
    setInterval(getOrdini, 1000*30);

}

var maxOr

async function getOrdini(){
    let ordini = await fetch("/getOrdini")
    ordini = await ordini.json()
    
    console.log(ordini)
    
    document.querySelector("main>div").innerHTML = ''
    ordini.forEach(ordine => {
        
        let descHotdog = ""

        descHotdog += ordine.Pane == 0 ? "No Pane<br>" : ""
        descHotdog += ordine.Salsiccia == 0 ? "No Salsiccia<br>" : ""
        descHotdog += ordine.Cipolle == 0 ? "No Cipolle<br>" : ""
        descHotdog += ordine.Crauti == 0 ? "No Crauti<br>" : ""
        /*descHotdog += ordine.Vegetariano == 1 ? "Vegetariano<br>" : ""*/

        if(descHotdog == "")
            descHotdog = "Completo"


        let card = document.createElement("div")
        card.innerHTML = 
        `<div class="card text-dark bg-light bg-gradient mb-3 shadow" style="max-width: 12rem;">
            <div class="card-header">Tavolo: ${(ordine.nTav).toUpperCase()}</div>
            <div class="card-body">
                <h5 class="card-title">Hotdog</h5>
                <p class="card-text">${descHotdog}</p>
            </div>
            <div class="card-body">
                <h5 class="card-title">Contorno</h5>
                <p class="card-text">${ordine.Patatine ? "Patatine" : "Insalata"}</p>
            </div>
            ${ordine.nOrd > maxOr ? '<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">NEW<span class="visually-hidden">New alerts</span></span>': ''}
            
        </div>
        `

        
        
        card.addEventListener("click", ()=>{
            alert("Ordine completato")
            card.style.opacity = 0.3;
            fetch("/completaOrdine", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idOr: ordine.nOrd
                })
            });
            
            setTimeout(()=>{
                card.remove()
            }, 60000)
            
        })
        if(ordine.Vegetariano == 1)
        {
            console.log(card.firstChild.classList)
            card.firstChild.classList.remove("bg-light")
            card.firstChild.classList.remove("text-dark")
            card.firstChild.classList.add("bg-success")
            card.firstChild.classList.add("text-light")
            console.log(card.firstChild.classList)

        }
        
        if(ordine.Completato != 1)
        {
            document.querySelector("main>div").appendChild(card)
        }
        
        
    })
    console.log(ordini[ordini.length - 1])
    maxOr = ordini[ordini.length - 1].nOrd
}