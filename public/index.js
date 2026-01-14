window.onload = async ()=>{
    let b = await fetch('/login')
    b = await b.text()
    console.log(b)

    document.querySelectorAll("input").forEach(input => {
        if(input.id != "swtVeggie")
        {
            input.checked = true

            input.addEventListener("change", ()=>{
                console.log()            
                if(input.checked)
                {
                    if(input.id == "swtPane")
                        document.getElementById("img_paneInf").style.filter = "grayscale(0)";
                    input.parentElement.parentElement.parentElement.children[1].style.filter = "grayscale(0)";
                    
                    if(input.id == "swtSalsiccia")
                        document.getElementById("swtVeggie").disabled = false
                }
                else
                {
                    if(input.id == "swtPane")
                        document.getElementById("img_paneInf").style.filter = "grayscale(0.7)";
                    input.parentElement.parentElement.parentElement.children[1].style.filter = "grayscale(0.7)";

                    if(input.id == "swtSalsiccia")
                    {
                        document.getElementById("swtVeggie").disabled = true
                        document.getElementById("swtVeggie").checked = false
                        document.getElementById("img_salsiccia").src = "img/Salsiccia.png"
                    }
                }
    
                    
            })
        }
    });

    
    document.getElementById("swtVeggie").addEventListener("click", ()=>{
        if(document.getElementById("swtVeggie").checked)
            document.getElementById("img_salsiccia").src = "img/SalsicciaVeg.png"
        else
            document.getElementById("img_salsiccia").src = "img/Salsiccia.png"
        
    })

    document.getElementById("swtInsalata").checked = false

    document.getElementById("swtInsalata").addEventListener("click", ()=>{
        if(document.getElementById("swtInsalata").checked)
        {
            document.getElementById("swtPatatine").checked = false
            document.getElementById("img_patatine").style.filter = "grayscale(0.7)"
        }
        else
        {
            document.getElementById("swtPatatine").checked = true
            document.getElementById("img_patatine").style.filter = "grayscale(0)"

        }
    })
    
    document.getElementById("swtPatatine").addEventListener("click", ()=>{
        if(document.getElementById("swtPatatine").checked)
        {
            document.getElementById("swtInsalata").checked = false
            document.getElementById("img_insalata").style.filter = "grayscale(0.7)"
        }
        else
        {
            document.getElementById("swtInsalata").checked = true
            document.getElementById("img_insalata").style.filter = "grayscale(0)"

        }
    })


    document.getElementById("avanti").addEventListener("click", ()=>{
        
        document.getElementById("hotdog").style.display = "none"
        document.getElementById("contorno").style.display = "flex"
        document.querySelector("h1").innerText = "Seleziona il tuo contorno!"

        document.getElementById("avanti").style.visibility = "hidden"
        document.getElementById("conferma").style.visibility = "visible"
        document.getElementById("indietro").style.visibility = "visible"


    })

    document.getElementById("indietro").addEventListener("click", ()=>{
        document.getElementById("hotdog").style.display = "flex"
        document.getElementById("contorno").style.display = "none"
        document.querySelector("h1").innerText = "Componi il tuo HotDog!"


        document.getElementById("avanti").style.visibility = "visible"
        document.getElementById("conferma").style.visibility = "hidden"
        document.getElementById("indietro").style.visibility = "hidden"

    })

    document.getElementById("conferma").addEventListener("click", ()=>{

        let ordine = {}
        let hotdog = {}
        let contorno 
        document.querySelectorAll(".form-check-input").forEach(swt =>{
            switch(swt.id)
            {
                case "swtPane": hotdog.Pane = swt.checked; break; 
                case "swtSalsiccia": hotdog.Salsiccia = swt.checked; break; 
                case "swtCipolle": hotdog.Cipolle = swt.checked; break; 
                case "swtCrauti": hotdog.Crauti = swt.checked; break; 
                case "swtVeggie": hotdog.Veggie = swt.checked; break;
                case "swtPatatine": contorno = swt.checked ? "Patatine" : "Insalata"; break;
            }
        })
        
        ordine.hotdog = hotdog
        ordine.contorno = contorno
        
        console.log(ordine)
        fetch("/ordina", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ordine: ordine
            }),
        });
        alert("Ordine inviato!")

        
        document.getElementById("indietro").click()
    })
}