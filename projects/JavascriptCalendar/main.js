window.onload = function() {
	startCalendar();

	function startCalendar() {
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var weekdaysSmall = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
		
		var dateObject = new Date(); //For todays date
		var todaysDate = dateObject.getDate(); //For todays date
		var mDateObject = new Date(); //For dates in a month
		mDateObject.setTime(dateObject.getTime()); //For dates in a month
		var sDateObject = new Date(); //For selected date
		sDateObject.setTime(dateObject.getTime()); //For selected date

		buildCalendar();

		function buildCalendar() {
			
			var date = document.querySelector('#currentDay p');
			date.innerHTML = "";
			date.innerHTML += weekdays[dateObject.getDay()]; //Puts the weekday

			var currentDate = document.querySelector('#currentDate p');
			currentDate.innerHTML = "";
			currentDate.innerHTML += dateObject.getDate(); //Puts todays date

			var currentMonth = document.querySelector('#currentMonth');
			currentMonth.innerHTML = "";
			currentMonth.innerHTML += months[mDateObject.getMonth()] + ' ' + mDateObject.getFullYear(); //Puts the current month and year 

			var daysOfWeek = document.querySelector('.day tr');
			daysOfWeek.innerHTML = "";

			for (x in weekdaysSmall) {
				daysOfWeek.innerHTML += '<th>' + weekdaysSmall[x] + '</th>'; //Puts the weekdays
			}

			var count = 1;
			mDateObject.setDate(count); //Sets the date to the first
			
			var currentMonthI = mDateObject.getMonth(); //Gets the index of the current month
			var dates = document.querySelector('.monthDate');
			dates.innerHTML = "";

			var datesString = "";

			for (var i = 0; i < 6; i++) { //For 6 rows in a calendar month
				datesString += '<tr>';

				for (var x = 0; x < 7; x++) { //For 7 days in a week
					datesString += '<td';

					if ((mDateObject.getDate() == dateObject.getDate()) && (mDateObject.getMonth() == dateObject.getMonth()) && (mDateObject.getFullYear() == dateObject.getFullYear())) {
						datesString += ' id="today"'; //If its todays date it adds this id
					}

					if ((mDateObject.getDay() == x) && (mDateObject.getMonth() == currentMonthI)) {
						datesString += ' class = "dateChangeAllowed">'; //If its a date it adds this class
						datesString += mDateObject.getDate(); //Puts the dates
						count++;
						mDateObject.setDate(count);
					} else {
						datesString += '>';
						datesString += '' //Puts nothing if its not a date
					}

					datesString += '</td>';
				}

				datesString += '</tr>';
			}

			if (mDateObject.getMonth() != currentMonthI) { //If we moved to the next month
				mDateObject.setMonth(mDateObject.getMonth() - 1); //Brings it back to the correct month
			}

			datesString += '</table>';

			dates.innerHTML = datesString;
			
			addOnClicks();
		}
			
		window.onkeydown = parseKeyboardInput;
			
		function addOnClicks(){
			var dateChange = document.querySelectorAll('.monthDate .dateChangeAllowed');
			for(x in dateChange) {
				var click = dateChange[x];
				click.onclick = dateClick; //Adds on click to the date objects
			}
			var prevM = document.querySelector('#prevMonth');
			prevM.onclick = prevMonth;
			var nextM = document.querySelector('#nextMonth');
			nextM.onclick = nextMonth;
		}
		
		function parseKeyboardInput(e) {
			if (e.keyCode == '37') { //Left arrow
				prevMonth();
			} else if (e.keyCode == '39') { //Right arrow
				nextMonth();
			}
		}

		function prevMonth() {
			mDateObject.setMonth(mDateObject.getMonth() - 1); //Sets the month to the previous month
			buildCalendar();
		}
		function nextMonth() {
			mDateObject.setMonth(mDateObject.getMonth() + 1); //Sets the month to the next month
			buildCalendar();
		}
		
		function dateClick(evt) {
			sDateObject.setDate(evt.target.innerHTML); //Gets the date that was clicked and sets it
			sDateObject.setMonth(mDateObject.getMonth()); //Sets the month of the date that was clicked
			sDateObject.setYear(mDateObject.getFullYear()); //Sets the year of the date that was clicked

			var currentDayText = document.querySelector('#currentDayText');
			currentDayText.innerHTML = weekdays[sDateObject.getDay()]; //Changes the day
			var currentDateText = document.querySelector('#currentDateText');
			currentDateText.innerHTML = sDateObject.getDate(); //Changes the date
		}
	}
}