
import { useEffect, useState } from 'react';
import React from 'react';

import "./sass/index.scss"


type challahPropertiesStateType = {
  size: "big" | "medium" | "small" ,
  quantity:  number
}


function App() {

  const [recipe, setRecipe] = useState<{[key:string]:number}| null>(null);

  const [challahProperties, setChallahProperties] = useState({size: "big"} as challahPropertiesStateType);
  const [challah, setChallah] =useState<challahPropertiesStateType | null>(null)

const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>)=>{
let {name} = e.target
let value: string |number;

if (name === "quantity") {
   value = parseFloat(e.target.value);
}else{
   value = e.target.value;
}


setChallahProperties((prevValue)=>{
  return{
    ...prevValue,
    [name]: value
  }
})

}

const handleSubmit = (e:React.FormEvent)=>{
  e.preventDefault();
  setChallah(challahProperties);
}


  useEffect(() => {
    if (challah) {
      setRecipe(generateRecipe(challah.size, challah.quantity));
    }
  }, [challah]);



  return (
    <div className="App">
    <h1>Welcome to the Challah Recipe Generator!</h1>
    <form onSubmit={handleSubmit} action="">
      <label htmlFor="">Challah size</label>
      <select onChange={handleChange} name="size" id="">
        <option value="big">Big (600 gr)</option>
        <option value="medium">Medium (300 gr)</option>
        <option value="small">Small(150 gr)</option>
        </select>
      <label htmlFor="">Number of challahs</label><input onChange={handleChange} name='quantity' required min={1} type="number" />
      {/* <label htmlFor="">Whole wheat to white wheat ratio</label><input type="text" />
      <label htmlFor="">Sugar to Honey Ratio</label><input type="text" /> */}
      <button type='submit'>Generate recipe!</button>
    </form>
    {recipe && <div className='recipe'>
      <h2>{`Recipe for ${challah!.quantity} ${challah!.size} challahes`}</h2>
      <h3>Total ingredient</h3>
      {Object.entries(recipe).map(([ingredient, amount]: [string, number]) => (
  <p key={ingredient}>
    <strong>{ingredient}:</strong> {amount}
  </p>


))}
      
      
      </div>}
    </div>
  );
}

export default App;


const generateRecipe = (size:string,quantity:number)=>{
    let x = size === "big" ? 1 : size === "medium" ? 2/3 : 1/3

    const defaultRecipe = {
  Flour: 330,
  Sugar: 63,
  Yeast: 12,
  Water: 140,
  Salt: 6,
  Oil: 45,
  Eggs: 1
}

  const adjustedRecipe: {[key:string]:number} = {}

  for (const [ingredient, amount] of Object.entries(defaultRecipe)) {
    adjustedRecipe[ingredient] = amount * x * quantity;
  }

  return adjustedRecipe  
}

// console.log(generateRecipe("big", 1));
