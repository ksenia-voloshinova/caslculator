var viewController = (function(){

    var DOMstrings = {
        inputType: "#input__type",
        inputDescription: "#input__description",
        inputValue: "#input__value",
        form:"#budget-form",
        incomeContainer: "#income__list",
        expenceContainer: "#expenses__list",
        budgetLabel: "#budget-value",
        incomeLabel: "#income-label",
        expensesLabel: "#expense-label",
        expensesPersentLabel: "#expense-persent-label",
        budgetTable: "#budget-table",
        monthLabel : "#month",
        yearLabel: "#year"

    }

    function getInput(){
        return{
            type: document.querySelector(DOMstrings.inputType).value ,
            description :document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function formatNumber(num, type){
        var getNumber, resultNumber;
        getNumber = new Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: 2
        });
        resultNumber = getNumber.format(num);
        if(type === "exp"){
            resultNumber = "- " + resultNumber;
        }else if (type === "inc"){
            resultNumber = "+ " + resultNumber;
        }
        return resultNumber;
    }

    function renderListItem(obj, type){
        var containerElement,  html;
        if ( type === "inc") {
            containerElement = DOMstrings.incomeContainer;
            html =` <li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        } else {
            containerElement = DOMstrings.expenceContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                             <div class="item__amount">
                                 %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }

        newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%description%", obj.description);
        newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);

    }


    function clearFields(){
        var inputDesc, inputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputDesc.focus();
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value= "";
        inputVal.value= "";
    }

    function updateBudget(obj){
        var type;
  
        if (obj.budget > 0){
            type = "inc";
        }else{
            type = "exp";
        }
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");

        if(obj.percentage > 0){
            document.querySelector(DOMstrings.expensesPersentLabel).textContent = obj.percentage;
        } else{
            document.querySelector(DOMstrings.expensesPersentLabel).textContent = "--";
        }

    }

    function deleteListItem(itemID){
        document.getElementById(itemID).remove();
    }
    
    function updateItemsPercentages(items){
        items.forEach(function(item){
           var el = document.getElementById(`exp-${item[0]}`).querySelector(".item__percent");

           if(item[1] >= 0){
                el.parentElement.style.display = "block";
                el.textContent = item[1] + "%";
           }else{
               el.parentElement.style.display = "none";
           }

        })
    }

    function displayMonth(){
        var now, year, month;
        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ];
        month = monthArr[month];

        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;
    }

    return{
        getInput: getInput,
        renderListItem:renderListItem,
        clearFields:clearFields,
        updateBudget:updateBudget,
        deleteListItem:deleteListItem,
        updateItemsPercentages:updateItemsPercentages,
        displayMonth:displayMonth,
        getDomStrings: function(){
            return DOMstrings;
        }
    }
})();