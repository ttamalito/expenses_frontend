
function App() {



  // add an expense
  const form = <form onSubmit={(event) => {submitData(event)}}>
    <input type="number" placeholder={'amount'} name={'amount'}/>
    <input type="number" placeholder={'month'} name={'month'}/>
    <input type="number" placeholder={'year'} name={'year'}/>
    <input type="text" placeholder={'type'} name={'type'}/>
    <input type="text" placeholder={'notes'} name={'notes'}/>
    <button >Add Expense</button>

  </form>
  return (
    <div className="App">
    <h1>Hello World</h1>
      {form}
    </div>
  );
}


function submitData(event) {
  event.preventDefault();
  const urlData = createUrlParams(event.nativeEvent.srcElement);

  fetch(`http://localhost:8080/addExpense`, {
    method: "POST",
    body: urlData,
  }).then(res => {
    console.log(res);

    // get the data
    res.json().then(data => {
      console.log(data);
    })
  }).catch(err => console.error(err));
} // end of submitdata

function createUrlParams(form) {
  // get the form data
  const formData = new FormData(form);

  // create the urlParams
  const urlData = new URLSearchParams();
  for (const pair of formData) {
    console.log(pair[0], pair[1]);
    urlData.append(pair[0], pair[1]);
  }

  return urlData;
}

export default App;
