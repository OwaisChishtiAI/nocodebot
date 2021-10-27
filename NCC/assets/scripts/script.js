function add_block() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

function question_type(element){
    var ques_type = element.getAttribute('value');
    console.log(ques_type);
    if (ques_type == "sq"){
        simple_question_block();
    }
}

function simple_question_block(){
    var card_div = document.createElement('div');
    card_div.classList.add('card');
    var container_div = document.createElement('div');
    container_div.classList.add('container');
    var q_label = document.createElement('label');
    q_label.innerText = "Question";
    var br = document.createElement('br');
    var q_input = document.createElement('input');
    q_input.type = "text";
    var hr = document.createElement('hr');
    var a_label = document.createElement('label');
    a_label.innerText = "Answers";
    var answer_add = document.createElement('a');
    answer_add.onclick = function() { add_answer_field(this); };
    var unique_uuid = generateUUID();
    answer_add.id = unique_uuid;
    var icon = document.createElement('i');
    icon.classList.add("fa", "fa-plus-circle");
    var br2 = document.createElement('br');
    var answer_div = document.createElement('div');
    answer_div.id = "div" + unique_uuid;
    var answer_div_inp = document.createElement('input');
    answer_div_inp.type = "text";

    answer_div.appendChild(answer_div_inp);
    container_div.appendChild(q_label);
    container_div.appendChild(br);
    container_div.appendChild(q_input);
    container_div.appendChild(hr);
    container_div.appendChild(a_label);
    answer_add.appendChild(icon);
    container_div.appendChild(answer_add);
    container_div.appendChild(br2);
    container_div.appendChild(answer_div);
    card_div.appendChild(container_div);
    document.body.appendChild(document.createElement('br'));
    document.body.appendChild(card_div);
}
 
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function add_answer_field(element){
    var elem = element.getAttribute('id');
    console.log("ID: " + elem);
    var answer_block = document.getElementById("div"+elem);
    var line_break = document.createElement('br')
    var new_answer_field = document.createElement('input')
    new_answer_field.type = "text";
    answer_block.appendChild(line_break);
    answer_block.appendChild(new_answer_field);
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.fixedButton')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}