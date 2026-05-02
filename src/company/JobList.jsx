

import { useNavigate } from "react-router-dom"


import Navbar from "../Component/Navbar" 
import "./joblist.css";

import cards from "../Data/Companies";

function JobList(){
    const company=["google","infosys","paytm","phonepay","swiggy","tcs","wipro","zomato1"];
   // const cards = Array.from({ length: 30 }, (_, i) => i + 1);

   const navigate = useNavigate();
    return(
    
        <div style={{minHeight:'100vh',background:'#f1f5f9', fontFamily: 'sans-serif' }}>
            <Navbar/>
            <div   style={{
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center", 
                }}
            >
                <input type="serach" placeholder="serach ccompany " name="jobs"
                style={{
                    width:"100vh",
                    height:"8vh",
                    border:"1px solid black",
                    margin:"100px",
                    borderRadius:"25px",
                    fontSize:"20px",

                   
                }}
               


                >
                </input>
            </div>
            <div className="slide-track">
  {company.concat(company).map((c, index) => (
    <div className="slide" key={index}>
      <img
        src={`/images/${c}.png`}
        alt={c}
        style={{ width: "120px" }}
      />
    </div>
  ))}
</div>

<div className="cards">
  {cards.map((item, index) => {
    console.log(item); // 

    return (
      <div className="cards-name" key={index}>
        <h2>{item.name}</h2>

        <p><b>Role:</b> {item.role}</p>
        <p><b>Batch:</b> {item.batch}</p>
        <p>{item.description}</p>

<button
  onClick={() => navigate(`/apply/${item.name.toLowerCase()}`)}
>
  Apply Job 🚀
</button>
      </div>
    );
  })}
</div>





  

</div>


       
      

    
    )
}
export default JobList;