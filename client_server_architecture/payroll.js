//uc1
class EmployeePayrollData{
    //getter and setter
    id;
    get name(){
        return this._name;
    }
    set name(name){
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(name))
            this._name=name;
            else throw 'Name is Incorrect!';
    }
    get profilePic(){
        return this._profilePic;
    }
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender=gender;
    }
    get department(){
        return this._department;
    }
    set department(department){
        this._department=department;
    }
    get salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary=salary;
    }
    get note(){
        return this._note;
    }
    set note(note){
        this._note=note;
    }
    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        let now=new Date();
        if(startDate>now) 
            throw 'Start Date is a Future Date!';
        var diff=Math.abs(now.getTime()-startDate.getTime());
        if(diff/(1000*60*60*24)>30)
            throw 'Start Date is beyond 30 days!';
        this._startDate=startDate;
    }
    //method
    toString(){
        const options={year:'numeric',month:'short',day:'numeric'};
        const empDate=!this.startDate?"undefined":this.startDate.toLocalDateString("en-US",options);
        return "id="+this.id + ", name='" + this.name + ", gender='"+this.gender + ", profilePic='"+this.profilePic + ", department='"+this.department+ ", salary="+this.salary+ ", startDate="+empDate+ ", note="+this.note;
    }
}
//uc2
window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            setTextValue('.text-error',"");
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            setTextValue('.text-error',"");
        }catch(e){
            setTextValue('.text-error',e);
        }
    });
    const date=document.querySelector('#date');
    date.addEventListener('input',function(){
        const startDate=new Date(Date.parse(getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year')));
        try{
            checkStartDate(new Date(Date.parse(startDate)));
            setTextValue('.date-error',"");
        }catch(e){
            setTextValue('.date-error',e);
        }
    });

    const salary=document.querySelector('#salary');
    setTextValue('.salary-output',salary.value);
    salary.addEventListener('input',function(){
    setTextValue('.salary-output',salary.value);
    });
    checkForUpdate();
});
//uc3
const save=()=>{
    try{
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}
const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayrollData();
    try{
        employeePayrollData.name=getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.date=Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
        if(item.checked) 
        selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}
const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}
//uc4
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList=[employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}
//uc5
const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','january');
    setValue('#year','2022');
}
const unsetSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}
const setTextValue=(id,value)=>{
    const element=document.querySelector(id);
    element.textContent=value;
}
const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}