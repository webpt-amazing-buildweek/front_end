import { useState, useEffect } from "react"


export const useSearchBar = (initialItems) => {
  // search term
  const [searchTerm, setSearchTerm] = useState("");
  // spread operator (in an array) to we don't manipulate the original object. // State to store the initial items
  const [initialItemState, setInitialItemState] = useState(initialItems)
  // Filtered Items on the Page 
  const [items, setItems] = useState([...initialItemState])
  
//search logic



  // console.log(items)
  useEffect(() => {
    const findMatch=()=>{

      
      setItems(initialItemState.filter((item)=>{
        // console.log(item)
          for(const key in item){
              // loop through all the keys in the object, return true if the string includes the searchTerm
              if(typeof(item[key]) === 'string' && item[key].includes(searchTerm)){
                  //if is string and if the value contains searchTerm
                  return true;
              }
          }
          // nothing is found here
          return false;
      })
    );
    };

    // Functional Update
    setItems((items)=> findMatch(items))
  },[searchTerm, initialItemState])

return [items, setSearchTerm, searchTerm, setInitialItemState]

}
// return [items, searchTerm, setSearchTerm, filterItems];