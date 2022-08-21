import React, { useState, useEffect } from 'react';
import {isDate,compareAsc,compareDesc,format,startOfWeek,startOfMonth,endOfMonth,endOfWeek,addDays,subDays,isSameDay,addMonths,subMonths} from "date-fns";
import './DatePicker.scss';

function DatePicket (props) {
  const [currentMonth,setCurrentMonth] = useState(props.currentMonth || new Date());
  const [selectedDate,setSelectedDate] = useState(new Date());
  const [dateArray,setDateArray] = useState([]);
  //props to disable days
  const [blockDaysBefore,setBlockDaysBefore] = useState(props.blockDaysBefore);
  const [blockDaysBeforeToday,setBlockDaysBeforeToday] = useState(props.blockDaysBeforeToday);
  const [blockDaysAfter,setBlockDaysAfter] = useState(props.blockDaysAfter)
  const [blockDays,setBlockDays] = useState(props.blockDays);
  const [blockDaysFrom,setBlockDaysFrom] = useState(props.blockDaysFrom);
  const [blockDaysTo,setBlockDaysTo] = useState(props.blockDaysTo);
  const [openDays,setOpenDays] = useState(props.openDays);
  const [multiple,setMultiple] = useState(props.multiple || false);
  const [blockAll,setBlockAll] = useState(props.blockAll || false);

  //props to select days
  const [selectedDays,setSelectedDays] = useState(props.selectedDays || []);
  //props on date selection
  const [onDayClick,setOnDayClick] = useState({fn:props.onDayClick || false});
  //prop to get selected days
  const [getSelectedDays,setGetSelectedDays] = useState(props.getSelectedDays || false);
  //prop to toggle date selection
  const [toggleDay,setToggleDay] = useState({fn:props.toggleDay || false});

  useEffect(() => {
    setBlockDaysBefore(props.blockDaysBefore);
    setBlockDaysBeforeToday(props.blockDaysBeforeToday);
    setBlockDaysAfter(props.blockDaysAfter);
    setBlockDays(props.blockDays);
    setBlockDaysFrom(props.blockDaysFrom);
    setBlockDaysTo(props.blockDaysTo);
    setOpenDays(props.openDays);
    setMultiple(props.multiple || false);
    setBlockAll(props.blockAll || false);
    setSelectedDays(props.selectedDays || []);
    setOnDayClick({fn:props.onDayClick || false});
    setGetSelectedDays(props.getSelectedDays || false)
    setToggleDay({fn:props.toggleDay || false});
    setCurrentMonth(props.currentMonth || new Date())
    renderCells();
  },[]);
  // onload function end
  useEffect(() => {
    renderCells();
  },[currentMonth]);

  useEffect(() => {
    if(toggleDay && toggleDay.fn){
      toggleDay.fn(toggleDate)
    } 
  },[dateArray]);

  var toggleDate = (day,status) =>{
    var days = Array.from(dateArray);
    for(var i=0;i<days.length;i++){
      for(var j=0;j<days[i].days.length;j++){
        if(isSameDay(days[i].days[j].day,day)){
          days[i].days[j].isSelected = status;
        } 
      }
      if(i===days.length-1){
        setDateArray(days)
      } 
    }
  }

  var getSelectedDates = () =>{
    var days = Array.from(dateArray); //clone
    const selectedDatesArr = [];
    for(var i=0;i<days.length;i++){
      for(var j=0;j<days[i].days.length;j++){
        if(days[i].days[j].isSelected){
          selectedDatesArr.push(days[i].days[j])
        } 
      }
      if(i===days.length-1){
        return selectedDatesArr;
      } 
    }
  }

  //main render function for calender
  const headerDateFormat = "MMMM yyyy";
  const dayDateFormat = "E";
  let dayStartDate = startOfWeek(currentMonth);

  var renderCells=() =>{
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const calStartDate = startOfWeek(monthStart);
    const calEndDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = calStartDate;
    let formattedDate = "";

    while (day <= calEndDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        var isSelected = false
        for(var a=0;a<selectedDays.length;a++){
          if(isSameDay(day,selectedDays[a])){
            isSelected = true;
          }
        }
        days.push({day,monthStart,selectedDate,cloneDay,formattedDate,isSelected});
        day = addDays(day, 1);
      }
      rows.push({days});
      days = [];
    }
    
    if(getSelectedDays){
      getSelectedDays(getSelectedDates());
    }
    setDateArray(rows);
  }
  //end of render function for calender
  
  //function to select days on load
  var selectDaysFun=(dateObj)=>{
    var days = Array.from(dateArray); //clone
    if(multiple){
      for(var i=0;i<days.length;i++){
        for(var j=0;j<days[i].days.length;j++){
          if(isSameDay(days[i].days[j].day,dateObj.date)){
            days[i].days[j].isSelected = !days[i].days[j].isSelected
          } 
        } 
      }
    } else {
      for(var i=0;i<days.length;i++){
        for(var j=0;j<days[i].days.length;j++){
          if(isSameDay(days[i].days[j].day,new Date(dateObj.date))){
            days[i].days[j].isSelected = !days[i].days[j].isSelected;
            for(var k=0;k<selectedDays.length;k++){
              if(isSameDay(selectedDays[k],days[i].days[j].day)){
                selectedDays.splice(k,1);
              }
            }
          } else if(selectedDays.length>0){
              for(var k=0;k<selectedDays.length;k++){
                if(isSameDay(selectedDays[k],days[i].days[j].day)){
                  days[i].days[j].isSelected = true;
                  break;
                } else {
                  days[i].days[j].isSelected = false;
                }
              }
            } else {
              days[i].days[j].isSelected = false;
          }
        } 
      }
    }
  }
  //end of function to select days on load

  var onDateClick = (date,index) => {
    setSelectedDate(new Date(date.day));
    selectDaysFun({date:new Date(date.day),isSelected:!date.isSelected},index);
    if(onDayClick && onDayClick.fn){
      onDayClick.fn({date:date.day,isSelected:date.isSelected})
    }
    if(getSelectedDays){
      getSelectedDays(getSelectedDates());
    }
  };

  var nextMonth = () => {
      setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  var prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  //function to disable days on render
  var blockDate = (date) => {
    var openDaysArray = openDays || [];
    var blockDaysArray = blockDays || [];
    var blockDatesFrom = (isDate(blockDaysFrom)===true?blockDaysFrom:undefined) || false;
    var blockDatesTo = (isDate(blockDaysTo)===true?blockDaysTo:undefined) || false;
    var startDate = false;
    var endDate = false;
    if(blockDaysAfter && isDate(blockDaysAfter)===true){
      endDate = blockDaysAfter || false
    }
    if(blockDaysBeforeToday && !(blockDaysBefore && isDate(blockDaysBefore))){
      startDate = subDays(new Date(),1) || false;
    }
    else if(blockDaysBefore && isDate(new Date(blockDaysBefore))===true && (isDate(new Date(blockDaysBeforeToday)) && compareAsc(new Date(blockDaysBefore),new Date())>=0)){
      startDate = blockDaysBefore || false;
    } else if(blockDaysBeforeToday){
      startDate = subDays(new Date(),1) || false;
    }
    if(blockAll){
      return true
    }
    if(Array.isArray(openDaysArray) && openDaysArray.length>0){
      for(var i=0;i<openDaysArray.length;i++){
        if(isSameDay(date,openDaysArray[i])){
          return false;
        }
      }
    }
    if(Array.isArray(blockDaysArray) && blockDaysArray.length>0){
      for(var i=0;i<blockDaysArray.length;i++){
        if(isSameDay(date,blockDaysArray[i])){
          return true;
        }
      }
    }

    if(blockDatesFrom && !blockDaysTo){
      if(compareAsc(date,new Date(blockDatesFrom))>=0){
        return true;
      } 
    } else if(blockDatesTo && !blockDatesFrom){
      if(compareAsc(date,new Date(blockDatesTo))<=0){
        return true;
      } 
    } else if(blockDatesFrom && blockDatesTo){
      if(compareAsc(date,new Date(blockDatesFrom))>=0 && compareAsc(date,new Date(blockDatesTo))<=0){
        return true;
      }
    }
    if(startDate && !endDate){
      if(compareAsc(date,new Date(startDate))<0){
        return true;
      } else {
        return false;
      }
    } else if(startDate && endDate){
      if(compareAsc(date,new Date(startDate))<0 || compareDesc(date,new Date(endDate))<0){
        return true;
      } else {
        return false;
      } 
    } else if(!startDate && endDate){
      if(compareDesc(date,new Date(endDate))<0){
        return true;
      } else {
        return false;
      } 
    } else {
      return false;
    }
  }
  //end of function to disable days on render
  return (
    <div className="book-slot-cal">
      <div className="book-slot-cal-header book-slot-cal-row flex-middle">
        <div className="book-slot-cal-col book-slot-cal-col-start">
          <div className="cal-month-icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="book-slot-cal-col book-slot-cal-col-center">
          <span>{format(currentMonth, headerDateFormat)}</span>
        </div>
        <div className="book-slot-cal-col book-slot-cal-col-end" onClick={nextMonth}>
          <div className="cal-month-icon">chevron_right</div>
        </div>
      </div>
      <div className="days book-slot-cal-row">{[1,2,3,4,5,6,7].map((item,i)=>{
        return(<div className="book-slot-cal-col book-slot-cal-col-center" key={i}>
          {format(addDays(dayStartDate, i), dayDateFormat)}
        </div>)})}
      </div>
      <div className="date-picker-wrapper">
        {dateArray.map((item,i)=>{
          return(
            <div className="book-slot-cal-row" key={i}>{item.days.map((data,index)=>{
              return(
                <div className={`book-slot-cal-col book-slot-cal-cell 
                  ${blockDate(data.day)? "book-slot-cal-cell-disabled": ""} ${data.isSelected ? "book-slot-cal-cell-selected" : ""}`} key={data.day}
                  onClick={() => {onDateClick(data,i)}}
                >
                  <span className="book-slot-cal-number">{data.formattedDate}</span>
                  <span className="book-slot-cal-day-bg">{data.formattedDate}</span>
                </div>)
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default DatePicket