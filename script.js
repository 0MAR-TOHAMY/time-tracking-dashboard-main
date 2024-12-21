const types = ["Work", "Play", "Study", "Exercise", "Social", "Self-Care"];
const activePeriod = document.querySelectorAll(".report-period h3");

async function dataByPeriod(period){
    activePeriod.forEach(ele => ele.classList.remove("current"));
    document.querySelector(`#${period}`).classList.add("current");
    try {
        const response = await fetch("data.json");
        const result = await response.json();
        
        result.forEach(ele => {
            types.forEach((type)=>{
                if(ele.title === type){
                    const active = type.toLowerCase();
                    let typeH2 = document.querySelector(`.${active} h2`);
                    let typeP = document.querySelector(`.${active} p`);

                    typeH2.innerHTML = `${ele.timeframes[period].current}hrs`;
                    typeP.innerHTML = `Last ${period == "daily" ? "day" : period == "weekly" ? "week" : "month"} - ${ele.timeframes[period].previous}hrs`;
                }
            })
        });
    } catch (error) {
        console.error(error);
    }
}