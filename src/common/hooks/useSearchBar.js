import {useState} from "react";


export const filterItems = (arrayOfItems) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState(arrayOfItems);
//search logic
//return filtered item array
return (
  <div>
        <section className='section'>
          <input
            type='text'
            className='input'
            onChange={e => setSearchTerm(e.target.value)}
            placeholder='Search...'
          />
       
          <ul>
            {items
              .filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((item, key) => (
                <li key={key}>
                  {item}{' '}
                </li>
          
          ))}
          </ul>
          </section>
  </div>
)
}
return [searchTerm, setSearchTerm, filterItems];