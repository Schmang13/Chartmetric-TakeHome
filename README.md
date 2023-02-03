# Chartmetric Take Home

### Instructions:
1. Create a navbar utilizing HTML and CSS to be responsive to multiple screen sizes.
2. Create a function that will manipulate incoming data (API calls) to return in a new format that would be utilized in graphs.

### Approach for NavBar:
1. Set-up a skeleton framework in HTML of how all of the components will fit together on the navbar.
2. Once all components are in html, transition to CSS to start manipulating the layout.
3. Re-adjust divs and tags to become flexboxes so that the navbar will respond to all page sizes
4. Set-up a media screen size so that once the page hits 480 pixels a new set of guidelines is followed for the page.

### Approach for Data Manipulation:
1. Look through the sample return data and make sure I understand the structure as well as where the pieces are coming from in the original data.
2. Understood that all of the information is only coming from the nested tracks object within each object in the array.
3. Start to map out and understand how many layers I will have to go down in order to access that data and then save it to an empty array to return later.
4. Save the data into the returned array without manipulating any of the values.
5. Once all of the data is extracted, run back through the tooltips object and manipulate the collected and final data into a string that lists all of the songs and number of plays.


### Talking Points:
1. I chose to not use React to build the navbar as it is only one component with no modularity or state. 
2. If this navbar were to take shape into a fuller website, then I feel transfering the html into JSX within React would be a worth while investment.
3. There may be more efficient ways to manipulate the data, but I've found when you burrow into multiple layers and extract different pieces of data, it is best to be more explicit with the code so that it is more legible.
