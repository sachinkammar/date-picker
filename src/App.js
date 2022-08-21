import React, { useState, useEffect } from 'react';
import './App.css';
import DatePicker from './DatePicker';

function App() {
  const [setDay,setSetDay] = useState();
  const [currentMonth,setCurrentMonth] = useState()
  const [selectedDays,setSelectedDays] = useState([]);
  const [blockDaysBefore,setBlockDaysBefore] = useState({});
  const [blockDaysAfter,setBlockDaysAfter] = useState({});
  const [randomNumber,setRandomNumber] = useState(0);

  useEffect(() => { 
    setRandomNumber(Math.random());
  },[blockDaysBefore,blockDaysAfter,selectedDays,currentMonth]);

  const getSelectedDays = (selectedDaysArr) =>{
    console.log('selectedDays',selectedDaysArr)
  }
  
  const toggleDay = (toggle) =>{ 
    setSetDay({toggle});
  }

  const onDayClick = (date) =>{                                        //this is called on date click in datepicker
    console.log('onDayClick called',date);
  }

  return (
    <div>
      <div style={{maxWidth:'700px', margin:'auto'}}>
        <h2 style={{textAlign:'center'}}>Calender/Date Picker</h2>
        <div style={{margin:'24px 0'}}>
          <div style={{padding:'12px 0', fontSize:16, fontWeight:'800', textAlign:'left'}}>Single Selection:</div>
          <DatePicker 
            multiple={false} 
            currentMonth={currentMonth} 
            onDayClick={onDayClick} 
            key={randomNumber} 
            selectedDays={selectedDays} 
            blockDaysBeforeToday={true} 
            blockDaysBefore={blockDaysBefore} 
            blockDaysAfter={blockDaysAfter} 
            getSelectedDays={getSelectedDays} 
            toggleDay={toggleDay} 
          />
        </div>
      </div>

      <div style={{maxWidth:'700px', margin:'auto'}}>
        <div style={{margin:'24px 0'}}>
          <div style={{padding:'12px 0', fontSize:16, fontWeight:'800', textAlign:'left'}}>Multiple Selection:</div>
          <DatePicker 
            multiple={true} 
            currentMonth={currentMonth} 
            onDayClick={onDayClick} 
            key={randomNumber} 
            selectedDays={selectedDays} 
            blockDaysBeforeToday={true} 
            blockDaysBefore={blockDaysBefore} 
            blockDaysAfter={blockDaysAfter} 
            getSelectedDays={getSelectedDays} 
            toggleDay={toggleDay} 
          />
        </div>
      </div>

      <div style={{maxWidth:'700px', margin:'auto'}}>
        <div style={{margin:'24px 0'}}>
          <div style={{paddingTop:'12px', fontSize:16, fontWeight:'800', textAlign:'left'}}>Props:</div>
          <ul>
            <li>multiple = Single/Multiple Selection</li>
            <li>currentMonth = set currentMonth to show</li>
            <li>onDayClick = function to call on click</li>
            <li>selectedDays = preselect days</li>
            <li>blockDaysBeforeToday = days before today to be enabled or disabled true/false</li>
            <li>blockDaysBefore = block days before certain date.</li>
            <li>blockDaysAfter = block days after certain date.</li>
            <li>getSelectedDays = called on load to get the selected days - if days are preselected</li>
            <li>{"toggleDay - a function to pass to datepicker and it returns a function, that can be called to select/unselect a day. call return function as: function(new Date('08-22-2022'), true))"}</li>
            <li>blockDays = array of dates block</li>
            <li>blockDaysFrom</li>
            <li>blockDaysTo</li>
            <li>blockAll = all dates blocked</li>
            <li>openDays - only these days are allowed to select</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
